const cheerio = require('cheerio');
const requestPromise = require('request-promise');
const config = require('../../configFile');

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

export async function setHtml(options){
    let html = await requestPromise(options);
    return html;
}

export function search(body) {
    let metadata = [];
    let $ = cheerio.load(body);
    $('span.year')
        .each( function (i, element) {
            let a = $(this).prev();
            let url = a.attr('data-url');
            metadata.push(url);
        });
    return metadata;
}

export async function main(message) {
    let options = queryMaker(message)
    let html = await setHtml(options);
    let array = search(html);
    return array;
}


