import { Schema } from 'mongoose';
export interface IGameType {
    player1:  Schema.Types.ObjectId; // uuid user1
    player2:  Schema.Types.ObjectId; // uuid user2
    winner?: Schema.Types.ObjectId | ''; // uuid winner user
}

export interface IGameRedisType {
    gameID: Schema.Types.ObjectId;
    player1: Schema.Types.ObjectId;
    player2: Schema.Types.ObjectId;
    currentPlayerTurn: Schema.Types.ObjectId;
    /*
        map field turns 
        c0, c1, c2,
        c3, c4, c5,
        c6, c7, c8
    */
    fieldTurns: { 
        c0: Schema.Types.ObjectId | '';
        c1: Schema.Types.ObjectId | '';
        c2: Schema.Types.ObjectId | '';
        c3: Schema.Types.ObjectId | '';
        c4: Schema.Types.ObjectId | '';
        c5: Schema.Types.ObjectId | '';
        c6: Schema.Types.ObjectId | '';
        c7: Schema.Types.ObjectId | '';
        c8: Schema.Types.ObjectId | '';
    },
    countTurns: number;
    winner?: Schema.Types.ObjectId;
}