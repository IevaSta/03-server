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
        const fileContent = await file.readPublicBinary(trimmedPath);
        res.end(fileContent);
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