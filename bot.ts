import 'module-alias/register';
import * as request from 'request-promise';
import * as io from 'socket.io-client';
import { table } from 'table';

// types
import { IGameRedisType } from '@Types/GameType';

// services
import MongoService from '@Services/MongoService';

// utils
import { LOGIN_ENDPOINT, GAME_ENDPOINT, GAMES_ENDPOINT } from '@Constants/routs';
import { CREATED_GAME_EVENT_WSS, TURN_GAME_EVENT_WSS, FINISH_GAME_EVENT_WSS } from '@Constants/eventsWSS';
import { SOCKET_PORT, SOCKET_HOST, API_HOST, API_PORT } from '@Config/index';

const API = `${API_HOST}:${API_PORT}`;
const WS_API = `${SOCKET_HOST}:${SOCKET_PORT}`;

const COUNT_GAMES = 10;


class Bot {
    countGames = 0;
    countGamesMax;
    player;
    socket;

    constructor(Player, games) {
        this.countGamesMax = games;
        this.socket = io.connect(WS_API, {
            autoConnect: true,
            query: {
              uuid: Player._id,
            },
        });

        this.player = {
            _id: Player._id,
            username: Player.username,
            password: Player.password,
            botLevel: Player.botLevel,
            token: '',
            games: {},
        }

        this.socket.on(CREATED_GAME_EVENT_WSS, ({ data, clientsID }) => {
            if(clientsID.includes(String(this.player._id))) {
                this._responseStartGameWSS(data);
            }
        });

        this.socket.on(TURN_GAME_EVENT_WSS, ({data, clientsID}) => {
            if(clientsID.includes(String(this.player._id))) {
                this._responseTurnGameWSS(data);
            }
        });

        this.socket.on(FINISH_GAME_EVENT_WSS, ({data, clientsID}) => {
            if(clientsID.includes(String(this.player._id))) {
                this._responseEndGameWSS(data);
            }
        });
    }

    public async sleep() { return new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * (+2000 - +1000)) + +1000)); };

    public renderTableInTerminal(turns, p1, p2) {
        const getSymbol = (s) => {
            if(s === '') return ' ';
            return s === String(p1) ? 'X' : 'O';
        }
        console.log('PLAYER 1 - ', p1);
        console.log('PLAYER 2 - ', p2);
        const data = [
            [getSymbol(turns.c0), getSymbol(turns.c1), getSymbol(turns.c2)],
            [getSymbol(turns.c3), getSymbol(turns.c4), getSymbol(turns.c5)],
            [getSymbol(turns.c6), getSymbol(turns.c7), getSymbol(turns.c8)],
        ];
        console.log( table(data));
        console.log('\n\n');
    }

    public async _responseStartGameWSS(data: IGameRedisType) {
        this.player.games[String(data.gameID)] = data;
        if(data.currentPlayerTurn == this.player._id) {
            console.log('CREATED_GAME_EVENT_WSS');
            this.renderTableInTerminal(data.fieldTurns, data.player1, data.player2);
            await this.turnGame(data.gameID);
        }

    }

    public async _responseTurnGameWSS(data: IGameRedisType) {
        this.player.games[String(data.gameID)] = data;
        if(data.currentPlayerTurn == this.player._id) {
            console.log('TURN_GAME_EVENT_WSS');
            this.renderTableInTerminal(data.fieldTurns, data.player1, data.player2);
            await this.turnGame(data.gameID);
        }
    }

    public async _responseEndGameWSS(data: IGameRedisType) {
        this.countGames++;
        console.log('FINISH_GAME_EVENT_WSS');
        this.renderTableInTerminal(data.fieldTurns, data.player1, data.player2);
        console.log('COUNT GAMES', this.countGames);
        if(this.countGames < this.countGamesMax) {
            await this.startGame();
        }

    }

    private getRandomTurn(turns): number | undefined {
        const freeCell = Object.keys(turns).filter(key => !turns[key]).map(cell => cell[1]);
        return +freeCell[Math.floor(Math.random() * freeCell.length )]
    }

   
    public async getJwtAccess() {
        const Auth = await request.post({
            method: 'POST',
            uri: `${API}${LOGIN_ENDPOINT}`,
            body: {
                username: this.player.username,
                password: this.player.password
            },
            json: true 
        });
        this.player.token = Auth.data.token;
    }

    public async startGame() {
        await this.sleep();
        await request({
            method: 'POST',
            uri: `${API}${String(GAMES_ENDPOINT)}`,
            headers: {
                Authorization: this.player.token
            },
            json: true 
        });
    }

    public async turnGame(gameID) {
        await this.sleep();
        const turnID = this.getRandomTurn(this.player.games[gameID].fieldTurns);

        // the moves are over
        if(turnID === undefined ) return;

        await request({
            method: 'PUT',
            uri: `${API}${String(GAME_ENDPOINT).replace(':id', gameID)}`,
            headers: {
                Authorization: this.player.token
            },
            body: {
                turnID
            },
            json: true 
        });
    }

    public getPlayerData() {
        return this.player;
    }

}



MongoService.connect(async () => {
    const DB = MongoService.getModels();
    const Users = await DB.Users.find();


    const bot1 = await new Bot(Users[0], COUNT_GAMES);
    const bot2 = await new Bot(Users[1], COUNT_GAMES);
    const bot3 = await new Bot(Users[2], COUNT_GAMES);



    await bot1.getJwtAccess();
    await bot2.getJwtAccess();
    await bot3.getJwtAccess();


    await bot1.startGame();
    await bot2.startGame();
    await bot3.startGame();
});
