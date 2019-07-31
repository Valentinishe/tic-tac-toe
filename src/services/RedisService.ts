import RedisDB, { Redis } from "ioredis";
import { REDIS_HOST, REDIS_PORT } from '@Config/index'


class RedisService {
    static connection():Redis {
        return new RedisDB(REDIS_PORT,  REDIS_HOST);
    }
}

export default RedisService;