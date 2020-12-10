import ApiService from '../apiservice'

class LancamentoService extends ApiService {

    constructor() {
        super('/api/lancamentos');
    }
    
}

export default LancamentoService