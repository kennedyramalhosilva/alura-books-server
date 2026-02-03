import express, { Request, Response } from "express"
import livroRouter from "./rotas/livro"

const app = express()

app.use(express.json())

const port = 8000

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!")
})

app.use("/livros", livroRouter)

app.listen(port, () => {
  console.log(`Escutando a porta http://localhost:${port}`)
})
