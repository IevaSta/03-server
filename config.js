const config = {};

config.dev = {
    name: 'dev',
    port: 4200,
    passwordLength: 2,
    defaultLanguage: 'en',
    db: {
        user: 'root',
        password: 'admin',
        database: 'batai',
    },
    cache: {
        default: 0,
        period: {},
    }
}

config.prod = {
    name: 'prod',
    port: 42069,
    passwordLength: 12,
    defaultLanguage: 'lt',
    db: {
        user: 'node_batai',
        password: 'xxxxxxxx',
        database: 'batai_zzz',
    },
    cache: {
        default: 60 * 60,
        period: {
            css: 60 * 60,
            js: 60 * 60,
            svg: 60 * 60,
            png: 60 * 60,
            jpg: 60 * 60,
            ico: 60 * 60,
            woff2: 60 * 60,
            woff: 60 * 60,
            ttf: 60 * 60,
            otf: 60 * 60,
            eot: 60 * 60,
            webmanifest: 60 * 60,
            pdf: 60 * 60,
            json: 60 * 60,
        },
    }
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