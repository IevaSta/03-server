import { server } from './lib/server.js'

const app = {};

app.init = () => {
    //susikurti busimus reikiamus folderius
    //susikurti busimus reikiamus failus, pvz.: robots.txt

    //paleidziam pacio serverio logika
    server.init();

    //paleidziam papildomus nuolatinius procesus:
    //- issitrinti nebereikalingus failus
    //- susiarchivuoti retai naudojamus failus
    //- prasukti reikiamus API
    //- vartotoju validacija
}

app.init();

export default app;