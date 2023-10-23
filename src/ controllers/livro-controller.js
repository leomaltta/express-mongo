import { livro } from "../models/index.js";
import { autor } from "../models/index.js";
import Erro404 from "../erros/Erro404.js";

class LivroController {
  static async listarLivros(req, res, next) {
    try {
      const buscaLivros = livro.find();

      req.resultado = buscaLivros;

      next();
    } catch (erro) {
      next(erro);
    }
  }

  static async listarLivroPorId(req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id);
      if (livroEncontrado !== null) {
        res.status(200).json(livroEncontrado);
      } else {
        next(new Erro404("Livro não encontrado."));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async cadastrarLivro(req, res, next) {
    try {
      let novoLivro = new livro(req.body);
      const livroResultado = await novoLivro.save();

      res.status(201).json({
        message: "Livro cadastrado com sucesso!",
        livro: livroResultado.toJSON,
      });
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarLivro(req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id);
      if (livroEncontrado !== null) {
        await livro.findByIdAndUpdate(id, req.body);
        res.status(200).json({ message: "Livro atualizado com sucesso!" });
      } else {
        next(new Erro404("Livro não encontrado."));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async deletarLivro(req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id);
      if (livroEncontrado !== null) {
        await livro.findByIdAndDelete(id);
        res.status(200).json({ message: "Livro deletado com sucesso!" });
      } else {
        next(new Erro404("Livro não encontrado."));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async listarLivrosPorFiltro(req, res, next) {
    try {
      const busca = await processaBusca(req.query);

      if (busca !== null) {
        const livrosPorEditora = livro.find(busca).populate("autor");

        req.resultado = livrosPorEditora;
        if (livrosPorEditora !== null) {
          next();
        } else {
          next(new Erro404("Editora não encontrada."));
        }
      } else {
        res.status(200).send([]);
      }
    } catch (erro) {
      next(erro);
    }
  }
}

async function processaBusca(param) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = param;

  const regex = new RegExp(titulo, "i");

  let busca = {};

  if (editora) busca.editora = editora;
  if (titulo) busca.titulo = regex;

  if (minPaginas || maxPaginas) busca.paginas = {};

  if (minPaginas) busca.paginas.$gte = minPaginas;
  if (maxPaginas) busca.paginas.$lte = maxPaginas;

  if (nomeAutor) {
    const autorC = await autor.findOne({ nome: nomeAutor });

    if (autorC !== null) {
      busca.autorC = autorC._id;
    } else {
      busca = null;
    }
  }

  return busca;
}

export default LivroController;
