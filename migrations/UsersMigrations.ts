import MongoService from '@Services/MongoService';
import { IUserType } from '@Types/UserType';
import { name, internet, random } from 'faker';

const { Users } = MongoService.getModels();

const COUNT_USERS = 10;

async function createUsers() {
    const usersData = [];

    await Users.remove({});
  

    for(let i = 0; i < COUNT_USERS ; i++) {
        const botLevel: any = random.number({ min: 0, max: 2 });
        const bot: IUserType = {
            username: `bot${i+1}`,
            email: internet.email(),
            firstName: name.firstName(),
            lastName: name.lastName(),
            rating: 0,
            botLevel,
            password: '123456'
        };
        usersData.push(bot);
    }

    await Users.create(usersData);
} 


export {
    createUsers
}