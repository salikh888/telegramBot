const cheerio = require('cheerio');
const requestPromise = require('request-promise');

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

export async function main(options) {
    let html = await setHtml(options);
    let array = search(html);
    return array;
}


