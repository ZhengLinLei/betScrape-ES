const libs = require('./libs');
const base = {
    baseUrl : 'https://www.loteriasyapuestas.es/servicios/buscadorSorteos',
    query : ['game_id', 'celebrados', 'fechaInicioInclusiva', 'fechaFinInclusiva'],
    lastBet : (bet) => {
        return `${base.baseUrl}?${base.query[0]}=${bet}&${base.query[1]}=true&${base.query[2]}=00010101&${base.query[3]}=${libs.getDate()}`;
    }
}

module.exports = base;