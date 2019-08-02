import { Request, Response } from 'express';

import MongoService from '@Services/MongoService';
import { responseEntiny, responseList } from '@Utils/responses';


const { Users } = MongoService.getModels();

async function getUsers(req: Request, res: Response) {
    // TODO: in future we add sorting, filters, pagination, etc
    const users = await Users.find();
    responseList(res, { data: users });
};

async function getUser(req: Request, res: Response) {
    const userID = req.params.id;
    const user = await Users.findById(userID);
    responseEntiny(res, { data: user });
}

async function postUser(req: Request, res: Response) {
    // TODO: implemented in future
    res.status(418).send("does not work, we will implement it in the future :)");
}

async function putUser(req: Request, res: Response) {
    // TODO: implemented in future
    res.status(418).send("does not work, we will implement it in the future :)");

}

async function deleteUser(req: Request, res: Response) {
    // TODO: implemented in future
    res.status(418).send("does not work, we will implement it in the future :)");
}




export default {
    getUsers,
    getUser,
    postUser,
    putUser,
    deleteUser
};