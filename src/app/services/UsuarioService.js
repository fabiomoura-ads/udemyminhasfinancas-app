import ApiService from '../apiservice'

class UsuarioService extends ApiService {

    constructor() {
        super('/api/usuarios');
    }

    autenticar(credenciais){
        return this.post('/autenticar', credenciais);
    }

    buscaSaldo(usuario){
        const { id } = usuario;
        return this.get(`/${id}/saldo`);
    }
    
}

export default UsuarioService