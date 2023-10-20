import livro from "../models/Livro.js";
import { autor } from "../models/Autor.js";

class LivroController {
  static async listarLivros(req, res, next) {
    try {
      const listaLivros = await livro.find().populate().exec();
      res.status(200).json(listaLivros);
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

  static async listarLivrosPorEditora(req, res, next) {
    const editora = req.query.editora;
    try {
      const livrosPorEditora = await livro.find({ editora: editora });
      if (livrosPorEditora !== null) {
        res.status(200).json(livrosPorEditora);
      } else {
        next(new Erro404("Editora não encontrada."));
      }
    } catch (erro) {
      next(erro);
    }
  }
}
export default LivroController;
