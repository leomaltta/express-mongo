import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: {
      type: String,
      required: [true, "O título do livro é obrigatório"],
    },
    editora: {
      type: String,
      required: [true, "A editora do livro é obrigatório"],
      enum: {
        values: ["Casa do código", "Alura", "Classicos Franceses"],
        message: "A editora {VALUE} fornecida não é permitida",
      },
    },
    preco: { type: Number },
    paginas: {
      type: Number,
      validate: {
        validator: (value) => {
          return value >= 10 && value <= 5000;
        },
        message: "O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}"
      },
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "autores",
      required: [true, "O(a) autor(a) é obrigatório"],
    },
  },
  { versionKey: false }
);

const livro = mongoose.model("livros", livroSchema);

export default livro;
