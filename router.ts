import * as express from 'express';
import { onValidation } from 'express-validation-map';
import { 
  LOGIN_ENDPOINT,
  USERS_ENDPOINT,
  USER_ENDPOINT,
  GAMES_ENDPOINT,
  GAME_ENDPOINT
} from '@Constants/routs';

// Validations
import { LoginValidationMap } from '@Validations/AuthValidations';
import { GameTurnValidationMap } from '@Validations/GamesValidations';



// Controllers
import UsersController from '@Controllers/UsersController';
import AuthController from '@Controllers/AuthController';
import GamesController from '@Controllers/GamesController';


const router = express.Router();

// AUTH
router.post(LOGIN_ENDPOINT, onValidation(LoginValidationMap), AuthController.login);

// USERS

// router.put(USER_ENDPOINT, onValidation(GameTurnValidationMap), UsersController.putUser)
router.route(USERS_ENDPOINT)
  .get(UsersController.getUsers)
  .post(UsersController.postUser);

router.route(USER_ENDPOINT)
  .get(UsersController.getUser)
  .put(UsersController.putUser)
  .delete(UsersController.deleteUser);

// GAMES
router.route(GAMES_ENDPOINT)
.get(GamesController.getGames)
.post(GamesController.postGame);

router.route(GAME_ENDPOINT)
.get(GamesController.getGame)
.put(onValidation(GameTurnValidationMap), GamesController.putGame)
.delete(GamesController.deleteGame);





export default router;