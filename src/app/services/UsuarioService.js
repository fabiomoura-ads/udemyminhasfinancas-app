import ApiService from '../apiservice'
import ErroValidacao from '../services/exceptions/ErroValidacao'

class UsuarioService extends ApiService {

    constructor() {
        super('/api/usuarios');
    }

    validar(usuario) {
        const erros = [];
        if (!usuario.nome.toString().trim()) {
            erros.push("Nome é obrigatório e não foi informado.");
        }

        if (!usuario.email.toString().trim()) {
            erros.push("Email é obrigatório e não foi informado.");
        } else if (!usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
            erros.push("Email não é válido.");
        }

        if (!usuario.senha.toString().trim() || !usuario.confirmacaoSenha.toString().trim()) {
            erros.push("Senha ou confirmação de senha não informado.");
        } else if (usuario.senha.toString().trim() !== usuario.confirmacaoSenha.toString().trim()) {
            erros.push("Confirmação de senha não confere.");
        }

        if (erros && erros.length > 0) {
            throw new ErroValidacao(erros);
        }
    }

    autenticar(credenciais) {
        return this.post('/autenticar', credenciais);
    }

    buscaSaldo(usuario) {
        const { id } = usuario;
        return this.get(`/${id}/saldo`);
    }

    salvar(usuario) {
        return this.post('', usuario)
    }

}

export default UsuarioService