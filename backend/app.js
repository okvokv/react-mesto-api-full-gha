// главный модуль
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const config = require('./config');
const NotFoundError = require('./middlewares/NotFoundError');
const auth = require('./middlewares/auth');
const adminsRouter = require('./routes/admins');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { requestsLogger, errorsLogger } = require('./middlewares/logger');

// подключение серверного модуля для интерпретации файла
const app = express();

// назначение порта сервера
const { PORT } = config;

// подключение базы данных
mongoose.connect('mongodb://0.0.0.0:27017/mestodb')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// сборка приходящих cookies
app.use(cookieParser());
// сборка объекта из JSON-формата
app.use(express.json());

// подключение логгера запросов
app.use(requestsLogger);

// обработчик CORS
app.use(cors());

// реализация возможности краш-теста при запросе на роут, потом удалить
app.get('/crash-test', () => {
  setTimeout(() => { throw new Error('Сервер сейчас упадёт'); }, 0);
});

// подключение роутеров
app.use('/', adminsRouter);
app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);

app.use('*', auth, ((req, res, next) => next(new NotFoundError('root'))));

// подключение логгера ошибок (после обр. запросов, до обр. ошибок)
app.use(errorsLogger);

// обработчик ошибок celebrate
app.use(errors());

// обработчик остальных ошибок
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  console.log('app:', statusCode, message);
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  next();
});

// включение прослушивания  порта
app.listen(PORT, () => {
  console.log(`App server listening at: http://localhost:${PORT}`);
});
