const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const listRouter = require('./routes/list.router');
const categoryRouter = require('./routes/category.router');
const searchRouter = require('./routes/search.router');
const dimensionsRouter = require('./routes/dimensions.router');
const detailsRouter = require('./routes/details.router');
const designersRouter = require('./routes/designers.router');
const materialsRouter = require('./routes/materials.router');
const detailsEditRouter = require('./routes/detailsEdit.router');
const uploadRouter = require('./routes/upload.router');
const addItemRouter = require('./routes/addItem.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/list', listRouter);
app.use('/api/category', categoryRouter);
app.use('/api/search', searchRouter);
app.use('/api/dimensions', dimensionsRouter);
app.use('/api/details', detailsRouter);
app.use('/api/designers', designersRouter);
app.use('/api/materials', materialsRouter);
app.use('/api/edit', detailsEditRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/add', addItemRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
