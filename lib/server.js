import http from 'http';
import { utils } from './utils.js';
import { file } from './file.js';

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

    if (isTextFile) {
        const fileContent = await file.readPublic(trimmedPath);
        res.end(fileContent);
        return;
    }

    if (isBinaryFile) {
        res.end('paduodamas binary failas...');
        return;
    }

    if (isApi) {
        res.end('paduodamas API atsakymas...');
        return;
    }

    if (isPage) {
        res.end(`<!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>

        <link rel="stylesheet" href="/css/base/base.css">
        <link rel="stylesheet" href="/favicon.ico" type="image/x-icon">
    </head>

    <body>
        <h1>comming soon...</h1>
        <img src="/img/logo.png" alt="Logo">
        <script src="/js/pages/home.js" defer></script>
    </body>

    </html>`);
        return;
    }
})

server.init = () => {
    server.httpServer.listen(4200);
}

export { server };