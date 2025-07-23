"use strict"
const express = require('express')
const http = require('http');
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')
const path = require('path')
const app = express()
const port = (process.env.PORT || 8097);
const host = (process.env.ROOTPATH || 'localhost:' + port );
const CSP_HOST = process.env.CSP_HOST ? process.env.CSP_HOST : '[]';
const hosts = JSON.parse(CSP_HOST);
const CSP_PARENTHOST = process.env.CSP_PARENTHOST ? process.env.CSP_PARENTHOST : '[]';
const parentHosts = JSON.parse(CSP_PARENTHOST);
const pkgjson = require('./package.json');
const compression = require('compression');
const CSP_DEFAULTSRC = process.env.CSP_DEFAULTSRC ? process.env.CSP_DEFAULTSRC : '[]';
const defaultSrc = JSON.parse(CSP_DEFAULTSRC);
const CSP_FRAMESRC = process.env.CSP_FRAMESRC ? process.env.CSP_FRAMESRC : '[]';
const frameSrc = JSON.parse(CSP_FRAMESRC);

app.use(compression({ level: 9 }));
app.use(helmet({
    frameguard: {
        action: 'deny'
    }
}))
app.use(helmet.xssFilter())
.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'", ...defaultSrc],
        scriptSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'", ...hosts],
        imgSrc: ["'self' data:", "'self' data: https:"],
        connectSrc: ["'self'", ...hosts],
        styleSrc: ["'self'", "'unsafe-inline'"],
        fontSrc: ["'self'", "data: font"],
        frameAncestors:[...hosts, ...parentHosts],
        frameSrc: ["'self'", ...frameSrc],
        scriptSrcAttr:["'unsafe-inline'"]
    }
}))
.use( helmet.hsts({maxAge:31536000,includeSubDomains: true}) )
.use(cors({ origin: host }))
.use(bodyParser.urlencoded({ extended: false }))
.use((req, res, next) => {
    res.header("Cross-Origin-Resource-Policy", "same-origin");
    res.header("Cross-Origin-Embedder-Policy", "require-corp");
    res.header("Cache-Control", "must-revalidate");
    next();
})
.use('/apps/072025-angular-16', express.static(path.join(__dirname, '/dist/072025-angular-16')))
.use(methodOverride());

app.get('/apps/072025-angular-16/version', (req, res) => {
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    res.json(pkgjson.version);
});
app.all('/apps/072025-angular-16/*', (req, res, next) => {
    // Just send the index.html for other files to support HTML5Mode
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    res.sendFile('index.html', { root: path.join(__dirname, '/dist/072025-angular-16') });
});

const server = http.createServer(app);
server.listen(port, (err) => {
    if (err) {
        throw err
    }
    console.log(`From Server: App iniciada exitósamente y corriendo en puerto: ${port}`)
})
