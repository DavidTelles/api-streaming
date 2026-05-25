const express = require('express');
const mongoose = require('mongoose');
const { Message } = require('selenium-webdriver/bidi/scriptTypes');
const router = express.Router();

const musicaSchema = new mongoose.Schema({
    titulo: String,
    artista: String,
    genero: String,
    ano: Number,
    duracao: Number,
    disponivel: Boolean,
    detalhes: Object
});

const Musica = mongoose.model("musicas", musicaSchema);

router.get("/", async (req, res) => {
    try{
        const musicas = await Musica.find();
        res.status(200).json(musicas);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

module.exports = router;