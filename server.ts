import 'module-alias/register';
import * as express from 'express';
import * as bodyParser from 'body-parser';


// services
import MongoService from '@Services/MongoService';
import SocketService from '@Services/SocketService';

// middlewares
import { verifyTokenAndGetUser } from '@Middlewares/AuthMiddlewares';


import Router from './router';

const PORT = 80;

const app: express.Application = express();

MongoService.connect();
SocketService.connection(app);

app.use(bodyParser.json())
app.use(verifyTokenAndGetUser);

app.use('/', Router);



app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`);
});