import express from 'express'
import { AppDataSource } from './data-source';
import routes from './routes/index';
import cors from "cors";

const port = process.env.PORT || 3000;
const route = process.env.ROUTE || 'http://localhost:5173/'

AppDataSource.initialize().then(() => {
    const app = express();

    app.use(express.json());
    app.use(cors({
        origin: route
    }));
    
    app.use(routes);
    return app.listen(port, () => {
        console.log('start application');
    });
})