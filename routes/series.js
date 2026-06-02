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

const serie = mongoose.model("series", seriesSchema);

router.get('/', (req, res) => {
    try {
        const series = Serie.find();
        res.status(200).json(series);
    } catch (err) {
        res.status(400).json({ message: err.message })
    };
});

router.get("/:id", async (req, res) => {
    try {

        const series = await Serie.findById(req.params.id);

        if(!series) {
            return res.status(404).json({ message: "Not found" });
        };

        res.status(200).json(series);

    } catch (err) {

        res.status(500).json({ message: err.message });

    }
});

router.post('/', async (req, res) => {
    try {
        const novaserie = new Serie(req.body);
        await novaserie.save();
        res.status(200).json(novaserie);
    } catch (err) {
        res.status(400).json({ message: err.message })
    };

});

router.put('/:id', async (req, res) => {
    try {
        const serieAtualizada = await Serie.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!serieAtualizada) {
            return res.status(404).json({ message: "Music Not Found" });
        };

        res.status(200).json(serieAtualizada);

    } catch (err) {
        res.status(500).json({ message: err.message })
    };
});

router.delete('/:id', async (req, res) => {
    try {
        const serieDeleta = await Serie.findByIdAndDelete(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!serieDeleta) {
            return res.status(404).json({ message: "serie Not Found" });
        };

        res.status(200).json({ message: "serie deletada!" });

    } catch (err) {
        res.status(500).json({ message: err.message })
    };
});

module.exports = router;