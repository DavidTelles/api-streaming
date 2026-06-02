const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const jogoSchema = new mongoose.Schema({
    titulo: String,
    genero: String,
    ano: Number,
    nota: Number,
    disponivel: Boolean,
    detalhes: Object
})

const Jogo = mongoose.model("jogos", jogoSchema);

router.get('/', (req, res) => {
    try {
        const jogos = jogo.find();
        res.status(200).json(jogos);
    } catch (err) {
        res.status(400).json({ message: err.message })
    };
});

router.get("/:id", async (req, res) => {
    try {

        const jogos = await Jogo.findById(req.params.id);

        if(!jogos) {
            return res.status(404).json({ message: "Not found" });
        };

        res.status(200).json(jogos);

    } catch (err) {

        res.status(500).json({ message: err.message });

    }
});

router.post('/', async (req, res) => {
    try {
        const novaJogo = new Jogo(req.body);
        await novaJogo.save();
        res.status(200).json(novaJogo);
    } catch (err) {
        res.status(400).json({ message: err.message })
    };

});

router.put('/:id', async (req, res) => {
    try {
        const jogoAtualizada = await Jogo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!jogoAtualizada) {
            return res.status(404).json({ message: "Music Not Found" });
        };

        res.status(200).json(jogoAtualizada);

    } catch (err) {
        res.status(500).json({ message: err.message })
    };
});

router.delete('/:id', async (req, res) => {
    try {
        const jogoDeleta = await Jogo.findByIdAndDelete(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!jogoDeleta) {
            return res.status(404).json({ message: "jogo Not Found" });
        };

        res.status(200).json({ message: "jogo deletada!" });

    } catch (err) {
        res.status(500).json({ message: err.message })
    };
});

module.exports = router;