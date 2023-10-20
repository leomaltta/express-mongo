import express from "express";
import conectaDb from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipuladorErros from "./middlewares/manipulador-erros.js";
import manipulador404 from "./middlewares/manipulador404.js";

const conexao = await conectaDb();

conexao.on("error", (erro) => {
  console.error("Erro de conexão", erro);
});

conexao.once("open", () => {
  console.log("Conexão com o banco feita com sucesso");
});

const app = express();
routes(app);

app.use(manipulador404);

app.use(manipuladorErros);

export default app;
