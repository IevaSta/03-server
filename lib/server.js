import http from 'http';
import { utils } from './utils.js';
import { file } from './file.js';
import config from '../config.js';

const server = {};

server.httpServer = http.createServer(async (req, res) => {

    const baseURL = `http${req.socket.encryption ? 's' : ''}://${req.headers.host}/`;
    const parseURL = new URL(req.url, baseURL);
    const httpMethod = req.method;
    const parsedPathName = parseURL.pathname;
    const trimmedPath = parsedPathName.replace(/^\/+|\/+$/g, ''); //regex

    const fileExtension = utils.fileExtension(trimmedPath);
    const textFileExtensions = ['css', 'js', 'svg', 'webmanifest', 'txt'];
    const binaryFilesExtensions = ['jpg', 'png', 'ico'];
    const isTextFile = textFileExtensions.includes(fileExtension);
    const isBinaryFile = binaryFilesExtensions.includes(fileExtension);
    const isApi = trimmedPath.startsWith('api/') === 0;
    const isPage = !isTextFile && !isBinaryFile && !isApi;

    const MIMES = {
        html: 'text/html',
        css: 'text/css',
        js: 'text/javascript',
        svg: 'image/svg+xml',
        png: 'image/png',
        jpg: 'image/jpeg',
        ico: 'image/x-icon',
        woff2: 'font/woff2',
        woff: 'font/woff',
        ttf: 'font/ttf',
        otf: 'font/otf',
        eot: 'application/vnd.ms-fontobject',
        webmanifest: 'application/manifest+json',
        pdf: 'application/pdf',
        json: 'application/json',
    };

    let responseContent = '';

    if (isTextFile) {
        responseContent = await file.readPublic(trimmedPath);
        const maxAge = config.cache.period[fileExtension] ?? config.cache.default;
        if (responseContent === false) {
            res.writeHead(404);
        } else {
            res.writeHead(200, {
                'Content-Type': MIMES[fileExtension] ?? MIMES.html,
                'Cache-Control': `max-age= ${maxAge}`,
            });
        }
    }

    if (isBinaryFile) {
        responseContent = await file.readPublicBinary(trimmedPath);
        const maxAge = config.cache.period[fileExtension] ?? config.cache.default;
        if (responseContent === false) {
            res.writeHead(404);
        } else {
            res.writeHead(200, {
                'Content-Type': MIMES[fileExtension] ?? MIMES.html,
                'Cache-Control': `max-age= ${maxAge}`,
            });
        }
    }

    if (isApi) {
        res.writeHead(503, {
            'Content-Type': MIMES.json,
        });
        responseContent = 'paduodamas API atsakymas...';
    }

    if (isPage) {
        res.writeHead(200, {
            'Content-Type': MIMES.html,
        });
        responseContent = `<!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Server</title>        
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png">
        <link rel="manifest" href="/favicon/site.webmanifest">
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5">
        <meta name="msapplication-TileColor" content="#da532c">
        <meta name="theme-color" content="#ffffff">
        <link rel="stylesheet" href="/css/base/base.css">
    </head>

    <body>
        <h1>comming soon...</h1>
        <img src="/img/logo.png" alt="Logo">
        <img src="https://image.shutterstock.com/image-photo/rivne-ukraine-november-21-2019-260nw-1566415204.jpg" alt="Wheels">
        <script src="/js/pages/home.js" defer></script>
    </body>

    </html>`;
    }

    return res.end(responseContent);
})

server.init = () => {
    server.httpServer.listen(config.port, () => {
        console.log(`Serveris paleistas ant http://localhost:${config.port}`);
    });
}

export { server };