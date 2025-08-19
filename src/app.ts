import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import webRoutes from './routes/web';

const app = express();
const port = process.env.PORT || 8080;

//template engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//public file
app.use(express.static('public'));

webRoutes(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});