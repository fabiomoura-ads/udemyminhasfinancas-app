import React from 'react'
import { withRouter } from 'react-router-dom'

import LancamentoService from '../../app/services/LancamentoService'
import LocalStorageService from '../../app/services/LocalStorageService'

import Card from '../../components/Card'
import FormGroup from '../../components/Form-group'
import SelectMenu from '../../components/SelectMenu'
import LancamentoTable from './LancamentoTable'

import { mensagemSucesso, mensagemErro } from '../../components/Toastr'

class ConsultaLancamentos extends React.Component {

    state = {
        ano: (new Date()).getFullYear(),
        mes: null,
        tipo: null,
        descricao: null,
        lancamentos: []
    }

    constructor() {
        super();
        this.service = new LancamentoService()
    }

    componentDidMount() {
        this.buscarLancamentos()
    }

    buscarLancamentos = () => {

        if ( !this.state.ano ) {
            mensagemErro('Ano é obrigatório para pesquisa.')    
            return;            
        }

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

        const lancamentoFiltro = {
            usuario: usuarioLogado.id,
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao
        }

        this.service
            .consultarLancamentos(lancamentoFiltro)
            .then(response => {
                this.setState({ lancamentos: response.data })
            }).catch(error => {
                mensagemErro(error.response.data)
            })

    }

    deletarLancamento = (id) => {
        
        this.service
            .deletar(id)
            .then(response => {
                mensagemSucesso("Lançamento excluído com sucesso!")

                this.buscarLancamentos()
                
            }).catch(error => {
                mensagemErro(error.response.data)
            })
    }

    render() {

        const listMeses = this.service.obterListaMeses();

        const listaTiposLancamentos = this.service.obterListaTipos()

        return (
            <Card title="Consulta Lançamentos">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputAno" label="Ano *" >
                                <input type="text"
                                    className="form-control"
                                    id="inputAno"
                                    value={this.state.ano}
                                    aria-describedby="emailHelp"
                                    onChange={e => this.setState({ ano: e.target.value })}
                                    placeholder="Digite o Ano" />
                            </FormGroup>
                            <FormGroup htmlFor="inputMes" label="Mês *" >
                                <SelectMenu className="form-control"
                                    id="inputMes"
                                    lista={listMeses}
                                    onChange={e => this.setState({ mes: e.target.value })} />
                            </FormGroup>
                            <FormGroup htmlFor="inputDescricao" label="Descrição" >
                                <input type="text"
                                    className="form-control"
                                    id="inputDescricao"
                                    onChange={e => this.setState({ descricao: e.target.value })}
                                    placeholder="Digite a descrição" />
                            </FormGroup>
                            <FormGroup htmlFor="inputTipoLancamento" label="Tipo Lançamento " >
                                <SelectMenu className="form-control"
                                    id="inputTipoLancamento"
                                    lista={listaTiposLancamentos}
                                    onChange={e => this.setState({ tipo: e.target.value })} />
                            </FormGroup>
                            <button onClick={this.buscarLancamentos} className="btn btn-success">Buscar</button>
                            <button className="btn btn-danger">Cadastrar</button>
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <LancamentoTable 
                                lancamentos={this.state.lancamentos} 
                                deleteAction={this.deletarLancamento}/>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(ConsultaLancamentos)