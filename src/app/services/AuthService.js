import LocalStorageService from './LocalStorageService'

export const USUARIO_LOGADO = '_usuario_logado'

class AuthService {

    static isUsuarioAutenticado() {
        const usuario = LocalStorageService.obterItem(USUARIO_LOGADO)
        return usuario && usuario.id
    }

    static removerUsuarioAutenticado() {
        LocalStorageService.removerUsuario(USUARIO_LOGADO);
    }

    static logar(usuario){
        LocalStorageService.adicionarItem(USUARIO_LOGADO, usuario)
    }

}

export default AuthService