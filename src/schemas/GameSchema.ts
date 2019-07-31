import { Schema, model, Document } from 'mongoose';

import { IGameType } from '@Types/GameType';


interface IGameModel extends Document, IGameType {};

const GamesSchema: Schema = new Schema({
  player1: { 
    type: Schema.Types.String,
    required: true, 
  },
  player2: { 
    type: Schema.Types.String,
    required: true, 
  },
  winner: { 
    type: Schema.Types.String, 
  }
});


export default model<IGameModel>('Game', GamesSchema);