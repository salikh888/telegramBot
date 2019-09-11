const Telegraf = require('telegraf');
const config = require('../configFile');
import {main} from "./moduls/searcher";

const bot = new Telegraf(config.token);

bot.start((ctx) => ctx.reply('Привет, я  преАльфа KinoDlyaVsehBot, я могу прислать ссылку на статью о фильме, с сайта КиноПоиск. Для того что бы получить ссылку с сайта отправь мне сообщение в формате:\n' +
    '     фильм Название Фильма\n' +
    'Например: фильм Нападение помидоров-убийц\n' +
    'и я отвечу: https://www.kinopoisk.ru/film/34866/ \n!'));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('t', (ctx) => ctx.reply('https://www.youtube.com'));
bot.on('message', async (ctx) => {
    console.log(ctx.message);
    let message = ctx.message.text;
    console.log(message);
    // ctx.reply(queryMaker(message));
    let arrayParams = await main(message);
    if ('https://www.kinopoisk.ru/undefined' === 'https://www.kinopoisk.ru/' + arrayParams[0]) {
        ctx.reply('Упс что то пошло не так');
    } else {
        ctx.reply('https://www.kinopoisk.ru/' + arrayParams[0]);
    }

});
bot.launch();