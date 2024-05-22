import express from "express"
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';

import viewsRouter from './routes/views.routes.js';
import productsRouter from './routes/products.routes.js';

import config from "./config.js"

const app = express()

const expressInstance = app.listen(config.PORT, async() => {
    await mongoose.connect(config.MONGODB_URI);
    console.log(`App activa en puerto ${config.PORT} enlazada a bbdd`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', `${config.DIRNAME}/views`);
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/static', express.static(`${config.DIRNAME}/public`));