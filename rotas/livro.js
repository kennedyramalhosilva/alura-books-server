const {Router} = require('express');
const {getLivros, getLivro, postLivro, patchLivro, deletarLivro} = require('../controladores/livro.js');
const router = Router();

router.get('/', getLivros);

router.get('/:id', getLivro);

router.post('/', postLivro);

router.patch('/:id', patchLivro);

router.delete('/:id', deletarLivro);

module.exports = router;