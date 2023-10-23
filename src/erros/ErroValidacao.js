import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class ErroValidacao extends RequisicaoIncorreta {
    constructor(erro) {
        const msgsErro = Object.values(erro.errors)
        .map(err => err.message)
        .join("; ");

        super(`Os seguintes erros foram encontrados: ${msgsErro}`);
    }
}

export default ErroValidacao;