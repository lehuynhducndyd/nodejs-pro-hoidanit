import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import webRoutes from './routes/web';
import initDatabase from './config/seed';
import passport from 'passport';
import configPassportLocal from './middleware/passport.local';
import session from 'express-session';
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('@prisma/client');


const app = express();
const port = process.env.PORT || 8080;

//template engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//public file
app.use(express.static('public'));

//session
app.use(session({
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000 // ms
    },
    secret: 'a santa at nasa',
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(
        new PrismaClient(),
        {
            checkPeriod: 1 * 24 * 60 * 60 * 1000, // ms
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }
    )
}))
//passport
app.use(passport.initialize())
app.use(passport.authenticate('session'));

//config passport local
configPassportLocal();
//request req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//seeding data

initDatabase();

app.use((req, res, next) => {
    res.locals.user = req.user || null; // Pass user object to all views
    next();
});

webRoutes(app);

app.use((req, res) => {
    res.send("404 Not Found")
})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});