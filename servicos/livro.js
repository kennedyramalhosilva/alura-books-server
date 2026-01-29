const fs = require('fs');

function getTodosLivros() {
    return JSON.parse(fs.readFileSync('livros.json'));
}

function getLivroPorId(id) {
    const livros = getTodosLivros();
    return livros.filter(livro => livro.id === id)[0];
}

function getUltimoLivro() {
    const livros = getTodosLivros();
    if (!Array.isArray(livros) || livros.length === 0) return null;
    return livros.reduce((maior, livro) => (livro.id > maior.id ? livro : maior), livros[0]);
}

function insereLivro(livroNovo) {
    const ultimoLivro = getUltimoLivro();
    const livroComId = {
        id: ultimoLivro ? String(Number(ultimoLivro.id) + 1) : '1',
        nome: livroNovo.nome
    };
    const novaListaDeLivros = [...getTodosLivros(), livroComId];
    atualizarBaseDeDados(novaListaDeLivros);
}

function modificaLivro(modificacoes, id) {
    let livrosAtuais = getTodosLivros();
    const indiceModificado = livrosAtuais.findIndex(livro => livro.id === id);
    if (indiceModificado === -1) {
        throw new Error('Livro não encontrado');

    }
    // verifica campos existentes e atualiza com as modificações, faz a comparação sozinho
    const conteudoMudado = { ...livrosAtuais[indiceModificado], ...modificacoes };
    livrosAtuais[indiceModificado] = conteudoMudado;
    atualizarBaseDeDados(livrosAtuais);
}

function atualizarBaseDeDados(novaListaDeLivros) {
    fs.writeFileSync('livros.json', JSON.stringify(novaListaDeLivros));
}

function deleteLivro(id) {
    let livrosAtuais = getTodosLivros();
    const novaListaDeLivros = livrosAtuais.filter(livro => livro.id !== id);
    atualizarBaseDeDados(novaListaDeLivros);
}

module.exports = {
    getTodosLivros,
    getLivroPorId,
    insereLivro,
    modificaLivro,
    deleteLivro
};