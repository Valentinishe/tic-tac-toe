import 'module-alias/register';
import * as express from 'express';
import * as bodyParser from 'body-parser';
// services
import MongoService from '@Services/MongoService';
import SocketService from '@Services/SocketService';
// middlewares
import { verifyTokenAndGetUser } from '@Middlewares/AuthMiddlewares';
// utils
import { API_PORT } from '@Config/index';

import Router from './router';

const app: express.Application = express();

MongoService.connect();
SocketService.connection();

app.use(bodyParser.json())
app.use(verifyTokenAndGetUser);

app.use('/', Router);


app.listen(API_PORT, function () {
  console.log(`Example app listening on port ${API_PORT}!`);
});