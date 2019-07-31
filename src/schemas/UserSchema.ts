import { Schema, model, Document } from 'mongoose';

import { IUserType } from '@Types/UserType';


interface IUserModel extends Document, IUserType {};

const UsersSchema: Schema = new Schema({
  email: { 
    type: Schema.Types.String, 
    required: true, 
    unique: true 
  },
  username: { 
    type: Schema.Types.String,
    required: true, 
    unique: true 
  },
  firstName: { 
    type: Schema.Types.String,
    required: true,
  },
  lastName: { 
    type: Schema.Types.String,
    required: true,
  },
  rating: {
    type: Schema.Types.Number, 
    default: 0, 
  },
  botLevel: {
    type: Schema.Types.Number,
    enum: [0,1,2],
    default: 0
  },
  password: {
    type: Schema.Types.String,
  }
});


export default model<IUserModel>('User', UsersSchema);