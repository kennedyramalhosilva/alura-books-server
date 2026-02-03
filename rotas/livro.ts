import { Router } from "express"
import {
  getLivros,
  getLivro,
  postLivro,
  patchLivro,
  deletarLivro
} from "../controladores/livro"

const router = Router()

router.get("/", getLivros)
router.get("/:id", getLivro)
router.post("/", postLivro)
router.patch("/:id", patchLivro)
router.delete("/:id", deletarLivro)

export default router