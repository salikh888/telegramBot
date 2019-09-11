const config = require('./configFile');

export function queryMaker(message) {
    const nameFilm = message.slice(6);
    const URL = config.kinoPoisk.searchUrl+ nameFilm;
    const URLen = encodeURI(URL);
    const optionsRequest = {
        uri : URLen,
        headers: {
            'User-Agent': config.headers["User-Agent"]
        },
    };
    return optionsRequest;
}