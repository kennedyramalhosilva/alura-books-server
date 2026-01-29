
const { getTodosLivros, getLivroPorId, insereLivro, modificaLivro, deleteLivro } = require('../servicos/livro');

function getLivros(req, res) {
    try {
        const livros = getTodosLivros();
        res.send(livros);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

function getLivro(req, res) {
    try {
        const id = req.params.id;
        const livro = getLivroPorId(id);
        res.send(livro);
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

function postLivro(req, res) {
    try {
        const livroNovo = req.body; 
        insereLivro(livroNovo);
        res.status(201).send("Livro inserido com sucesso");
    } catch (error) {
        res.status(500).send({message: error.message});
    }       
}

function patchLivro(req, res) {
    try {
        const id = req.params.id;
        const body = req.body;
        modificaLivro(body, id);
        res.status(200).send("Livro atualizado com sucesso");   
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

function deletarLivro(req, res) {
    try {
        const id = req.params.id;   
        deleteLivro(id);
        res.status(200).send("Livro deletado com sucesso");
    } catch (error) {
        res.status(500).send({message: error.message});
    }   
}

module.exports = {
    getLivros,
    getLivro,
    postLivro,
    patchLivro,
    deletarLivro
};