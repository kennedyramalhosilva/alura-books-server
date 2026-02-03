import { Request, Response } from "express"
import {
  getTodosLivros,
  getLivroPorId,
  insereLivro,
  modificaLivro,
  deleteLivro
} from "../servicos/livro"
import { Livro } from "../model/Livro"

export function getLivros(req: Request, res: Response): void {
  try {
    const livros = getTodosLivros()
    res.json(livros)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}

export function getLivro(req: Request, res: Response): void {
  try {
    const id = Number(req.params.id)

    if (Number.isNaN(id)) {
      res.status(412).json({ message: "ID inválido" })
      return
    }

    const livro = getLivroPorId(id)

    console.log(livro)
    console.log(id)

    if (!livro) {
      res.status(404).json({ message: "Livro não encontrado" })
      return
    }

    res.json(livro)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}

export function postLivro(req: Request, res: Response): void {
  try {
    const livroNovo: Omit<Livro, "id"> = req.body

    if (!livroNovo.nome) {
      res.status(412).json({ message: "Nome do livro é obrigatório" })
      return
    }

    insereLivro(livroNovo)
    res.status(201).send("Livro inserido com sucesso")
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}

export function patchLivro(req: Request, res: Response): void {
  try {
    const id = Number(req.params.id)

    if (Number.isNaN(id)) {
      res.status(412).json({ message: "ID inválido" })
      return
    }

    const body: Partial<Livro> = req.body
    modificaLivro(body, id)

    res.status(200).send("Livro atualizado com sucesso")
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}

export function deletarLivro(req: Request, res: Response): void {
  try {
    const id = Number(req.params.id)

    if (Number.isNaN(id)) {
      res.status(412).json({ message: "ID inválido" })
      return
    }

    deleteLivro(id)
    res.status(200).send("Livro deletado com sucesso")
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}
