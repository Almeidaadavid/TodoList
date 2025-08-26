import express from 'express'
import { AppDataSource } from './data-source';
import routes from './routes/index';

const port = process.env.PORT || 3000;

AppDataSource.initialize().then(() => {
    const app = express();

    app.use(express.json());
    app.use(routes);
    return app.listen(port, () => {
        console.log('start application');
    });
})