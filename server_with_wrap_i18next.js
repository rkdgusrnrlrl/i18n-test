const express = require('express');
const i18next = require('i18next');
const Backend = require('i18next-node-fs-backend');

const app = express();
const port = process.env.PORT || 8080;

const ramDB = [
    {
        id : "kang hyeon ku",
        lang : "ko",
        t : "123123"
    },
    {
        id : "sam",
        lang : "en",
        t : "234234"
    }
];

const LANG_CODES = ["ko", "en"];

function getLang(req) {
    const token = req.header("t");

    const users = ramDB.filter((user) => user.t === token);
    if (users.length === 0) return "en";
    if (!("lang" in users[0])) return "en";
    if (!LANG_CODES.includes(users[0].lang)) return "en";

    return users[0].lang;
}

i18next
    .use(Backend)
    .init({
        backend: {
            loadPath: __dirname + '/locales/{{lng}}.json'
        },
        fallbackLng: 'en',
        preload: ['en', 'ko'],
        saveMissing: true
    });


const i18nextInstMap = {
    ko : i18next.getFixedT("ko"),
    en : i18next.getFixedT("en"),
};

app.get('/', (req, res) => {
    const lang  = getLang(req);
    res.send(i18nextInstMap[lang]('home.title'));
});

app.get('/im', (req, res) => {
    const lang  = getLang(req);
    res.send(i18nextInstMap[lang]('im', {name : "hyeon ku"}));
});

app.listen(port, (err) => {
    console.log(`Server is listening on port ${port}`);
});