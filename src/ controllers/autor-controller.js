import mongoose from "mongoose";
import { autor } from "../models/Autor.js";
import Erro404 from "../erros/Erro404.js";

class AutorController {
  static async listarAutores(req, res) {
    try {
      const listaAutores = await autor.find({});
      res.status(200).json(listaAutores);
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - falha na requisição` });
    }
  }

  static async listarAutorPorId(req, res, next) {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findById(id);
      if (autorEncontrado !== null) {
        res.status(200).json(autorEncontrado);
      } else {
        next(new Erro404("Id do Autor não encontrado."));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async cadastrarAutor(req, res, next) {
    try {
      const newAutor = await autor.create(req.body);
      res
        .status(201)
        .json({ message: "Autor cadastrado com sucesso!", autor: newAutor });
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarAutor(req, res, next) {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findById(id);
      if (autorEncontrado !== null) {
        await autor.findByIdAndUpdate(id, req.body);
        res.status(200).json({ message: "Autor atualizado com sucesso!" });
      } else {
        next(new Erro404("Id do Autor não encontrado."));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async deletarAutor(req, res, next) {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findById(id);
      if (autorEncontrado !== null) {
        await autor.findByIdAndDelete(id);
        res.status(200).json({ message: "Autor deletado com sucesso!" });
      } else {
        next(new Erro404("Id do Autor não encontrado."));
      }
    } catch (erro) {
      next(erro);
    }
  }
}
export default AutorController;
