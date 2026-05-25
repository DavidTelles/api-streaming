const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const seriesSchema = new mongoose.Schema({
    titulo: String,
    genero: String,
    ano: Number,
    nota: Number,
    disponivel: Boolean,
    temporadas: Number,
    atores: Array,
    detalhes: Object
});

const series = mongoose.model("series", seriesSchema);

router.get("/", async ( req, res ) => {
    try{
        const series = await Serie.find();
        res.status(200).json(series)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

module.exports = router;