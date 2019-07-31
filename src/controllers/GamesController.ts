import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { get } from 'lodash';

// utils
import { CREATED_GAME_EVENT_WSS, TURN_GAME_EVENT_WSS, FINISH_GAME_EVENT_WSS } from '@Constants/eventsWSS';
import { IS_GAME_NOT_FOUNT_TEXT_ERROR, BAD_TURNID_TEXT_ERROR, IS_NOT_PLAYER_TURN_TEXT_ERROR } from '@Constants/errors';
import { getWinner } from '@Utils/game';
import { EXPIRES_GAME, MAX_SCRORE_FOR_THE_GAME } from '@Config/index';

// types
import { IGameRedisType} from '@Types/GameType';

// services
import MongoService from '@Services/MongoService';
import SocketService from '@Services/SocketService';
import RedisService from '@Services/RedisService';

import { responseEntiny, responseList, responseMessage, responseWSS, response404, responseErrorMessage } from '@Utils/responses';
import { SOMETHING_WAS_WRONG_RESPONSE_TEXT } from '@Constants/response';


const { Games, Users } = MongoService.getModels();
const redis = RedisService.connection();


async function getGames(req: Request, res: Response) {
    // TODO: in future we add sorting, filters, pagination, etc
    const games = await Games.find();
    responseList(res, { data: games });
};

async function getGame(req: Request, res: Response) {
    const gameID = req.params.id;
    const game = await Games.findById(gameID);
    responseEntiny(res, { data: game });
}

async function postGame(req: Request, res: Response) {
    const { io, socket } = SocketService.getConnection();
    const userID = get(req, 'user.userID', '');

    try {
        // added to queue users
        await redis.lpush('queue', userID);
        const countUsers  = await redis.llen('queue');
        
        if(countUsers > 2) {
            const player1 =  await redis.lpop('queue');
            const player2 =  await redis.lpop('queue');

            const gameCreated = await Games.create({ player1, player2 });

            const game: IGameRedisType = { 
                gameID: gameCreated._id, 
                player1: gameCreated.player1,
                player2: gameCreated.player2,
                currentPlayerTurn: gameCreated.player1,
                fieldTurns: { c0: '', c1: '', c2: '', c3: '', c4: '', c5: '', c6: '', c7: '', c8: '' },
                countTurns: 0,
                winner: null
            };

            redis.set(`game:${game.gameID}`, JSON.stringify(game), 'ex', EXPIRES_GAME);
            // TODO: TEMPORARY SOLUTIONS (clientsID)
            io.emit(CREATED_GAME_EVENT_WSS, responseWSS({ data: game, clientsID: [player1, player2] }));

        }

        responseMessage(res, { message: '', status: 204 });

    } catch (e) {
        responseErrorMessage(res, {status: 500, message: e});
    }

   
}

async function putGame(req: Request, res: Response) {
    const { io, socket } = SocketService.getConnection();
    const gameID = req.params.id;
    const playerID = req['user'].userID;
    const turnID = req.body.turnID;

    try {
        const rawGame =  await redis.get(`game:${gameID}`);

        if(!rawGame) {
            return response404(res, { message: IS_GAME_NOT_FOUNT_TEXT_ERROR });
        }

        const game: IGameRedisType = JSON.parse(rawGame);

        // check - whose move
        if(game.currentPlayerTurn !== playerID) {
            return responseErrorMessage(res, { status: 400, message: IS_NOT_PLAYER_TURN_TEXT_ERROR});    
        }

        if(game.fieldTurns[`c${turnID}`] === '') {
            game.fieldTurns[`c${turnID}`] = playerID;
            game.countTurns = game.countTurns + 1;
            game.currentPlayerTurn = game.currentPlayerTurn === game.player1 ? game.player2 : game.player1; 

            const winner = getWinner(game);

            if(winner) { // finish game
                game.winner = winner;
                await Games.findByIdAndUpdate(gameID, { winner });
                const score = MAX_SCRORE_FOR_THE_GAME - game.countTurns; 
                await Users.findByIdAndUpdate(winner, { $inc: { rating: score }});
                
                // TODO: TEMPORARY SOLUTIONS (clientsID)                
                io.emit(FINISH_GAME_EVENT_WSS, responseWSS({ data: game, clientsID: [String(game.player1), String(game.player2)] }));
                redis.del(`game:${game.gameID}`);
                
                return responseMessage(res, { message: "", status: 204 });
            }

            if( game.countTurns >= 9) { // if the draw - is temporary solution
                // TODO: TEMPORARY SOLUTIONS (clientsID)                
                io.emit(FINISH_GAME_EVENT_WSS, responseWSS({ data: game,  clientsID: [String(game.player1), String(game.player2)] }));
                redis.del(`game:${game.gameID}`);
            
            } else { 
                redis.set(`game:${game.gameID}`, JSON.stringify(game));
                // TODO: TEMPORARY SOLUTIONS (clientsID)
                io.emit(TURN_GAME_EVENT_WSS, responseWSS({ data: game,  clientsID: [String(game.player1), String(game.player2)]}));
            }

            return responseMessage(res, { message: "", status: 204 });
        }

        return responseErrorMessage(res, { status: 400, message: BAD_TURNID_TEXT_ERROR});    

    } catch(e) {
        responseErrorMessage(res, {status: 500, message: SOMETHING_WAS_WRONG_RESPONSE_TEXT});
    }
}

async function deleteGame(req: Request, res: Response) {
    // implemented in future
    res.status(418).send("does not work, we will implement it in the future :)");
}




export default {
    getGames,
    getGame,
    postGame,
    putGame,
    deleteGame
};