import fs from "fs"
import { Livro } from "../model/Livro"

function getTodosLivros(): Livro[] {
  const data = fs.readFileSync("livros.json", "utf-8")
  return JSON.parse(data) as Livro[]
}

function getLivroPorId(id: number): Livro | undefined {
  const livros = getTodosLivros()
  return livros.find(livro => livro.id === id)
}

function getUltimoLivro(): Livro | null {
  const livros = getTodosLivros()
  if (livros.length === 0) return null

  return livros.reduce((maior, livro) =>
    livro.id > maior.id ? livro : maior
  )
}

function insereLivro(livroNovo: Omit<Livro, "id">): void {
  const ultimoLivro = getUltimoLivro()

  const livroComId: Livro = {
    id: ultimoLivro ? ultimoLivro.id + 1 : 1,
    nome: livroNovo.nome
  }

  const novaListaDeLivros = [...getTodosLivros(), livroComId]
  atualizarBaseDeDados(novaListaDeLivros)
}

function modificaLivro(
  modificacoes: Partial<Livro>,
  id: number
): void {
  const livrosAtuais = getTodosLivros()

  const indiceModificado = livrosAtuais.findIndex(
    livro => livro.id === id
  )

  if (indiceModificado === -1) {
    throw new Error("Livro não encontrado")
  }

  livrosAtuais[indiceModificado] = {
    ...livrosAtuais[indiceModificado],
    ...modificacoes
  }

  atualizarBaseDeDados(livrosAtuais)
}

function deleteLivro(id: number): void {
  const livrosAtuais = getTodosLivros()
  const novaListaDeLivros = livrosAtuais.filter(
    livro => livro.id !== id
  )
  atualizarBaseDeDados(novaListaDeLivros)
}


function atualizarBaseDeDados(novaListaDeLivros: Livro[]): void {
  fs.writeFileSync("livros.json", JSON.stringify(novaListaDeLivros))
}

export {
  getTodosLivros,
  getLivroPorId,
  insereLivro,
  modificaLivro,
  deleteLivro
}