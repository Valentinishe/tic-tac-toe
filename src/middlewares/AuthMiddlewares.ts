import { Request, Response } from 'express';
import * as jwt  from  'jsonwebtoken';

// utils
import { LOGIN_ENDPOINT } from '@Constants/routs';
import { responseErrorMessage } from '@Utils/responses';
import { FORBIDDEN_RESPONSE_TEXT } from '@Constants/response';


function verifyTokenAndGetUser(req: Request, res: Response, next) {
    const urlsWithoutAuth = [LOGIN_ENDPOINT];

    if(!urlsWithoutAuth.includes(req.path)) {
        const result: any = jwt.decode(req.headers.authorization);

        if(!result || !result.userID){   
            return responseErrorMessage(res, { message: FORBIDDEN_RESPONSE_TEXT, status: 403 })
        } 
       
        // TODO: temporarily - typescript is not detect :)
        req['user'] = { userID: result.userID }
    }
    next();
}



export {
    verifyTokenAndGetUser
}