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

//process.env.NODE_ENV priskiriam kintamajam ---- issitraukiam, ka zmogus parase, jeigu parase
const nodeEnv = process.env.NODE_ENV;

//=ar uzklausoje nurodyta aplinka (neigiama ar teigiama stringo reiksme) ? TAIP -> options : NE -> 'dev'
const env = nodeEnv ? nodeEnv : 'dev';

//= ar turi nurodyta aplinka ? jeigu turi, naudojam aplinka : jeigu neturi, naudojam default nurodyta aplinka
const options = config[env] ? config[env] : config.dev;

// console.log(nodeEnv);
// console.log(options);

export default options;