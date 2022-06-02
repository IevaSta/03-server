const config = {};

config.dev = {
    name: 'dev',
    passwordLength: 2,
    defaultLanguage: 'en',
    db: {
        user: 'root',
        password: 'admin',
        database: 'batai',
    },
}

config.prod = {
    name: 'prod',
    passwordLength: 12,
    defaultLanguage: 'lt',
    db: {
        user: 'node_batai',
        password: 'xxxxxxxx',
        database: 'batai_zzz',
    },
}

//spausdinam objekta: process.env.NODE_ENV priskiriam kintamajam
const nodeEnv = process.env.NODE_ENV;
// const options = config[nodeEnv] //objekto value []

//= nodeEnv ?jeigu jis yra, atrodys taip =>? config[nodeEnv] :jeigo jo nera, naudosim: config.dev
const options = nodeEnv ? config[nodeEnv] : config.dev;


console.log(nodeEnv);
console.log(options);


/*
node ./index.js                 -dev by default
NODE_ENV=dev node ./index.js    -dev
NODE_ENV=prod node ./index.js   -prod ypatinga aplinka
NODE_ENV=test node ./index.js   -test (jei konkreti aplinka neuzregistruota - by default pasirinks dev aplinka)
*/