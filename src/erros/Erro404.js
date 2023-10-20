import ErroBase from "./ErroBase.js";

class Erro404 extends ErroBase {
    constructor(message = "Página não encontrada") {
        super(message, 404);
    }
}

export default Erro404;