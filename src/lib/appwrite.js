import {Account, Client} from 'appwrite';
import {config} from 'dotenv';

config();
const appwrite = new Client();
appwrite
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)

const account = new Account(appwrite)


    export {appwrite}
    export {account}