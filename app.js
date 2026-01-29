const express = require('express');
const livroRouter = require('./rotas/livro');
const app = express();
app.use(express.json());

const port = 8000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/livros', livroRouter);

app.listen(port, () => {
  console.log(`Escutando a porta http://localhost:${port}`);
});