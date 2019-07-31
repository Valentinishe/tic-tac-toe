import { Request, Response } from 'express';
import * as jwt  from  'jsonwebtoken';
import { isEmpty } from 'lodash';

// utils
import { SECRET_JWT, EXPIRES_JWT } from '@Config/index';
import { responseEntiny, responseErrorMessage } from '@Utils/responses';
import { IS_AUTH_INCORRECT_TEXT_ERROR } from '@Constants/errors';



// services
import MongoService from '@Services/MongoService';



const { Users } = MongoService.getModels();



async function login(req: Request, res: Response) {
    const { username, password } = req.body;

    // TODO: In the future will ecrypt password
    const user = await Users.findOne({ username, password});

    if(isEmpty(user)){
        responseErrorMessage(res, { status: 401, message: IS_AUTH_INCORRECT_TEXT_ERROR });
    }
    const expiresIn = Date.now() + EXPIRES_JWT;
    const token = jwt.sign({ userID: user._id }, SECRET_JWT, { expiresIn });

    responseEntiny(res, { data: { expiresIn, token }});
};






export default {
    login,
};