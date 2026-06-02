const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const livroSchema = new mongoose.Schema({
    titulo: String,
    autor: String,
    genero: String,
    ano: Number,
    paginas: Number,
    disponivel: Boolean,
    detalhes: Object
})

const Livro = mongoose.model("livros", livroSchema);

router.get('/', (req, res) => {
    try {
        const livros = Livro.find();
        res.status(200).json(livros);
    } catch (err) {
        res.status(400).json({ message: err.message })
    };
});

router.get("/:id", async (req, res) => {
    try {

        const livros = await Livro.findById(req.params.id);

        if(!livros) {
            return res.status(404).json({ message: "Not found" });
        };

        res.status(200).json(livros);

    } catch (err) {

        res.status(500).json({ message: err.message });

    }
});

router.post('/', async (req, res) => {
    try {
        const novaLivro = new Livro(req.body);
        await novaLivro.save();
        res.status(200).json(novaLivro);
    } catch (err) {
        res.status(400).json({ message: err.message })
    };

});

router.put('/:id', async (req, res) => {
    try {
        const livroAtualizada = await Livro.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!livroAtualizada) {
            return res.status(404).json({ message: "Music Not Found" });
        };

        res.status(200).json(livroAtualizada);

    } catch (err) {
        res.status(500).json({ message: err.message })
    };
});

router.delete('/:id', async (req, res) => {
    try {
        const livroDeleta = await Livro.findByIdAndDelete(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!livroDeleta) {
            return res.status(404).json({ message: "Music Not Found" });
        };

        res.status(200).json({ message: "livro deletada!" });

    } catch (err) {
        res.status(500).json({ message: err.message })
    };
});

module.exports = router;