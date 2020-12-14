import ApiService from '../apiservice'
import ErroValidacao from '../services/exceptions/ErroValidacao'

class LancamentoService extends ApiService {

    constructor() {
        super('/api/lancamentos');
    }

    obterListaMeses() {
        return [
            { value: '', label: 'SELECIONE...' },
            { value: 1, label: 'Janeiro' },
            { value: 2, label: 'Fevereiro' },
            { value: 3, label: 'Março' },
            { value: 4, label: 'Abril' },
            { value: 5, label: 'Maio' },
            { value: 6, label: 'Junho' },
            { value: 7, label: 'Julho' },
            { value: 8, label: 'Agosto' },
            { value: 9, label: 'Setembro' },
            { value: 10, label: 'Outubro' },
            { value: 11, label: 'Novembro' },
            { value: 12, label: 'Dezembro' }
        ]
    }

    validar(lancamento){
        const erros = [];
        if ( !lancamento.descricao ){
            erros.push('Informe uma descrição.')
        }
        if ( !lancamento.ano ){
            erros.push('Informe um ano.')
        }
        if ( !lancamento.mes ){
            erros.push('Informe um mês.')
        }
        if ( !lancamento.tipo ){
            erros.push('Informe um tipo.')
        }
        if ( !lancamento.valor ){
            erros.push('Informe um valor.')
        }  
        if ( erros && erros.length > 0 ) {
            throw new ErroValidacao(erros);
        }
    }

    atualizarStatus(id, status){
        return this.put(`/${id}/atualiza-status`, { status })
    }

    obterListaTipos() {
        return [
            { value: '', label: 'SELECIONE...' },
            { value: 'RECEITA', label: 'Receita' },
            { value: 'DESPESA', label: 'Despesa' }
        ]
    }

    consultarLancamentos(lancamentoFiltro) {
        let params = `?usuario=${lancamentoFiltro.usuario}`;

        if (lancamentoFiltro.ano) {
            params += `&ano=${lancamentoFiltro.ano}`
        }

        if (lancamentoFiltro.mes) {
            params += `&mes=${lancamentoFiltro.mes}`
        }

        if (lancamentoFiltro.tipo) {
            params += `&tipo=${lancamentoFiltro.tipo}`
        }

        if (lancamentoFiltro.descricao) {
            params += `&descricao=${lancamentoFiltro.descricao}`
        }        

        return this.get(params);
    }

    deletar(id){
        return this.delete(`/${id}`);
    }

    salvar(lancamento){
        return this.post('/', lancamento);
    }

    obterPorId(id, idUsuario){
        return this.get(`/${id}?usuario=${idUsuario}`)
    }

    atualizar(lancamento){
        return this.put(`/${lancamento.id}`, lancamento)
    }    

}

export default LancamentoService