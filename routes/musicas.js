const express = require('express');
const mongoose = require('mongoose');
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
    try {
        const musicas = await Musica.find();
        res.status(200).json(musicas);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

router.get("/:id", async (req, res) => {
    try {

        const musicas = await Musica.findById(req.params.id);

        if(!musicas) {
            return res.status(404).json({ message: "Not found" });
        };

        res.status(200).json(musicas);

    } catch (err) {

        res.status(500).json({ message: err.message });

    }
});

router.post('/', async (req, res) => {
    try {
        const novaMusica = new Musica(req.body);
        await novaMusica.save();
        res.status(200).json(novaMusica);
    } catch (err) {
        res.status(400).json({ message: err.message })
    };

});

router.put('/:id', async (req, res) => {
    try {
        const musicaAtualizada = await Musica.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!musicaAtualizada) {
            return res.status(404).json({ message: "Music Not Found" });
        };

        res.status(200).json(musicaAtualizada);

    } catch (err) {
        res.status(500).json({ message: err.message })
    };
});

router.delete('/:id', async (req, res) => {
    try {
        const musicaDeleta = await Musica.findByIdAndDelete(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!musicaDeleta) {
            return res.status(404).json({ message: "Music Not Found" });
        };

        res.status(200).json({ message: "Musica deletada!" });

    } catch (err) {
        res.status(500).json({ message: err.message })
    };
});


module.exports = router;