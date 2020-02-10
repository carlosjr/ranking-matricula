import express from 'express';
import bodyParser from 'body-parser';
import authorization from './auth';
import config from './config/config';
import datasource from './config/datasource';
import enrollmentsRouter from './src/routes/enrollments';
import booksRouter from './src/routes/books';
import usersRouter from './src/routes/users';
import authRouter from './src/routes/auth';

const app = express();
app.config = config;
app.datasource = datasource(app);

app.use(express.static(__dirname + '/dist'));


// Resolvendo CORS
// const allowCrossDomain = (req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', '*');
//     res.header('Access-Control-Allow-Headers', '*');
//     next();
// }

// app.use('*', allowCrossDomain)

app.use('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        res.status(200).end();
    }
    next();
});

app.set('port', 7000);
app.use(bodyParser.json());

const auth = authorization(app);
app.use(auth.initialize())
app.auth = auth;

booksRouter(app)
enrollmentsRouter(app)
usersRouter(app)
authRouter(app)

export default app;
