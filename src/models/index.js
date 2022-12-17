// mod.cjs
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { libs, base, data } = require('../helpers');
// Return model
const model = {};

model.getAPI = data.api;

model.getIndex = async (format) => {
    const _f = (data.api.includes(format)) ? format : data.api[0];
    let _data = data.index;
    switch (_f) {
        case "json": 
            // Formate all json
            let _d = {avaliable: [], notAvaliable: [], data: _data};
            Object.keys(_data).forEach(key => (_data[key]) ? _d.avaliable.push(key) : _d.notAvaliable.push(key));
            _data = _d; // Save it
            break;
        case "xml":
            Object.keys(_data).forEach(key => _data[key] = (_data[key]) ? 'Avaliable' : 'Not Avaliable');
            _data = libs.toXml({query: _data}, {header: true, indent: '  '});
            break;

        case "csv":
            _data = libs.toCsv([_data], ',');
            break;
    }
    return {_f, data: _data};
}

// Get last bet: https://www.loteriasyapuestas.es/servicios/buscadorSorteos?game_id=${:0}&celebrados=true&fechaInicioInclusiva=${:1}&fechaFinInclusiva=${:2}
model.getLastBet = async (format, bet) => {
    // Check if bet is avaliable and existing in data
    if(!Object.keys(data.index).includes(bet) || !data.index[bet]) throw new Error(404);
    // Check if format is avaliable
    const _f = (data.api.includes(format)) ? format : data.api[0];
    const _b = data.name[bet];
    // Get last bet
    const _url = base.lastBet(_b);
    // Fetch _url and get data
    const _data = await (await fetch(_url)).json();


    return {_f, data: _data[0]}
}

module.exports = model;