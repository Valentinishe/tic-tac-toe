import 'module-alias/register';
import MongoService from '@Services/MongoService';

// migrations
import { createUsers } from './UsersMigrations';


MongoService.connect(async () => {
    await createUsers();

    process.exit();
});

