// TODO: some constants we will move to .env files in future

// MONGODB
export const MONGO_CONNECT = 'mongodb://root:123456@localhost:27017/CrossDB'

// JWT
export const SECRET_JWT = 'some secret code...';
export const EXPIRES_JWT = 1000 * 60 * 60 * 24; // (ms) - 1 day

// GAMES
export const EXPIRES_GAME = 60 * 10; //  (sec) - 10 minutes
export const MAX_SCRORE_FOR_THE_GAME = 10;

// REDIS
export const REDIS_HOST = 'localhost'; 
export const REDIS_PORT = 6379; 

// SOCKET
export const SOCKET_PORT = 3038; 

// APP
export const EXPRESS_PORT = 80; 


