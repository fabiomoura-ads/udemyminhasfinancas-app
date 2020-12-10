import ApiService from '../apiservice'

class LancamentoService extends ApiService {

    constructor() {
        super('/api/lancamentos');
    }

    consultarLancamentos(idUsuario, lancamentoFiltro){
        let params = `?usuario=${idUsuario}`;
        
        if ( lancamentoFiltro.ano ) {
            params += `&ano=${lancamentoFiltro.ano}` 
        }
        
        if ( lancamentoFiltro.mes ) {
            params += `&mes=${lancamentoFiltro.mes}` 
        }
        
        if ( lancamentoFiltro.tipo ) {
            params += `&tipo=${lancamentoFiltro.tipo}` 
        }

        return this.get(params);
    }
    
}

export default LancamentoService