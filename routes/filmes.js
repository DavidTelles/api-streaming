const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const filmeSchema = new mongoose.Schema({
    titulo: String,
    genero: String,
    ano: Number,
    nota: Number,
    disponivel: Boolean,
    atores: Array,
    detalhes: Object
})

const Filme = mongoose.model("filmes", filmeSchema);

router.get('/', (req, res) => {
    try {
        const filmes = Filme.find();
        res.status(200).json(filmes);
    } catch (err) {
        res.status(400).json({ message: err.message })
    };
});

router.get("/:id", async (req, res) => {
    try {

        const filmes = await Filme.findById(req.params.id);

        if(!filmes) {
            return res.status(404).json({ message: "Not found" });
        };

        res.status(200).json(filmes);

    } catch (err) {

        res.status(500).json({ message: err.message });

    }
});

router.post('/', async (req, res) => {
    try {
        const novafilme = new Filme(req.body);
        await novafilme.save();
        res.status(200).json(novafilme);
    } catch (err) {
        res.status(400).json({ message: err.message })
    };

});

router.put('/:id', async (req, res) => {
    try {
        const filmeAtualizada = await Filme.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!filmeAtualizada) {
            return res.status(404).json({ message: "Music Not Found" });
        };

        res.status(200).json(filmeAtualizada);

    } catch (err) {
        res.status(500).json({ message: err.message })
    };
});

router.delete('/:id', async (req, res) => {
    try {
        const filmeDeleta = await Filme.findByIdAndDelete(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!filmeDeleta) {
            return res.status(404).json({ message: "filme Not Found" });
        };

        res.status(200).json({ message: "filme deletada!" });

    } catch (err) {
        res.status(500).json({ message: err.message })
    };
});

module.exports = router;