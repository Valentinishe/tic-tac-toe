const mongoose = require("mongoose");
import { MONGO_CONNECT } from '@Config/index'; 

// types
import UserModel from '@Schemas/UserSchema'; 
import GameModel from '@Schemas/GameSchema'; 



class MongoDB {
    static connect(cb?: () => any) {
        mongoose.connect(MONGO_CONNECT, { useNewUrlParser: true }, function(err){
            if(err) return console.error("Error connection to MONGO DB", err);
            console.log("Connected to MongoDB Successfully");
            cb && cb();
        });
    }
    static getModels() {
        return {
            Users: UserModel,
            Games: GameModel

        }
    }
}

export default MongoDB;