import http from 'http';

const server = {};

server.httpServer = http.createServer((req, res) => {
    console.log('gavau uzklausa is kliento...');
    res.end('Sveiki atvyke...')
})

server.init = () => {
    server.httpServer.listen(4200);
    
}

export { server };