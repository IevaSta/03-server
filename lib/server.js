import http from 'http';
import { utils } from './utils.js';
import { file } from './file.js';
import config from '../config.js';

import { pageHome } from '../pages/home.js'
import { page404 } from '../pages/404.js';
import { pageRegister } from '../pages/register.js';
import { pageLogin } from '../pages/login.js';

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


    const maxAge = config.cache.period[fileExtension] ?? config.cache.default;
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



        responseContent = page404();
    }

    return res.end(responseContent);
})

server.init = () => {
    server.httpServer.listen(config.port, () => {
        console.log(`Serveris paleistas ant http://localhost:${config.port}`);
    });
}

export { server };