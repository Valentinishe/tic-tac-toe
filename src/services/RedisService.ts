import RedisDB, { Redis } from "ioredis";
import { REDIS_HOST, REDIS_PORT } from '@Config/index'


class RedisService {
    static connection():Redis {
        return new RedisDB({ host: REDIS_HOST, port: +REDIS_PORT});
    }
}

export default RedisService;