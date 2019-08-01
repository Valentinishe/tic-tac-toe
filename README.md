# tic-tac-toe
backend-part

### About Project
In this project, I started implement simple game `Tic Tac Toe`.
I try create multiplayer game on express.js, I also use redis (for store queue users and state games), modgodb (for store, another data) and Sockets for respond on many async request. 


*This project was created in a short time (as a test task), therefore, some solutions may be far from ideal.*

Video for understand, what 
[I mean](https://www.dropbox.com/s/qy0konji0y74kmk/%D0%97%D0%B0%D0%BF%D0%B8%D1%81%D1%8C%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202019-07-31%20%D0%B2%2017.15.36.mov?dl=0) 
when developed this project

I hope you will like it)
### install 
- clone repository
 
- install redis (run in terminal `brew install redis`)
- install mongodb (run in terminal  `brew install mongodb`)


- run `npm install`
- r run `mongod` and `brew services start redis` in another tab terminal (it should work while the script is running `npm start`)
- run `npm run migrate` - for create users
- run `npm start` - for start server
- run `npm run bot` - for start bot


 
