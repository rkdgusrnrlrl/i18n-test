const express = require('express');
const i18next = require('i18next');
const i18nextMiddleware = require('i18next-express-middleware');
const Backend = require('i18next-node-fs-backend');

const app = express();
const port = process.env.PORT || 8080;

i18next
    .use(Backend)
    .use(i18nextMiddleware.LanguageDetector)
    .init({
        backend: {
            loadPath: __dirname + '/locales/{{lng}}.json'
        },
        fallbackLng: 'en',
        preload: ['en', 'ko'],
        saveMissing: true
    });

app.use(i18nextMiddleware.handle(i18next));

app.get('/en', (req, res) => {
    res.send(req.t('home.title'));
});

app.get('/en/im', (req, res) => {
    res.send(req.t('im', {name : "hyeon ku"}));
});

app.get('/ko', (req, res) => {

    req.i18n.changeLanguage("ko");
    res.send(req.t('home.title'));
});

app.get('/ko/im', (req, res) => {

    req.i18n.changeLanguage("ko");
    res.send(req.t('im', {name : "강현구"}));
});

app.listen(port, (err) => {
    console.log(`Server is listening on port ${port}`);
});