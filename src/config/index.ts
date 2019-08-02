import * as dotenv from 'dotenv';
dotenv.config();

// MONGODB
export const MONGO_CONNECT = 'mongodb://mongo:' + process.env.MONGODB_PORT + '/GameDB';

// JWT
export const SECRET_JWT = 'some secret code...';
export const EXPIRES_JWT = 1000 * 60 * 60 * 24; // (ms) - 1 day

// GAMES
export const EXPIRES_GAME = 60 * 10; //  (sec) - 10 minutes
export const MAX_SCRORE_FOR_THE_GAME = 10;

// REDIS
export const REDIS_HOST = process.env.REDIS_HOST; 
export const REDIS_PORT = process.env.REDIS_PORT; 

// SOCKET
export const SOCKET_PORT = process.env.SOCKET_PORT; 
export const SOCKET_HOST = process.env.SOCKET_HOST;

// APP
export const API_PORT = process.env.API_PORT;
export const API_HOST = process.env.API_HOST;


