const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express()
app.use(cors())
app.use(express.json());
const port = process.env.PORT || 3000

mongoose.connect(process.env.MONGO_URI)
mongoose.connection.on('connected', () => {
    console.log('Connect to MongoDB');
});

const musicasRouter = require('./routes/musicas');
const filmesRouter = require('./routes/filmes');
const seriesRouter = require('./routes/series');
const jogosRouter = require('./routes/jogos');
const livrosRouter = require('./routes/livros');

app.use('/musicas', musicasRouter);
app.use('/filmes', filmesRouter);
app.use('/series', seriesRouter);
app.use('/jogos', jogosRouter);
app.use('/livros', livrosRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})