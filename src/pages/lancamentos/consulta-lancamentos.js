import React from 'react'
import { withRouter } from 'react-router-dom'

import LancamentoService from '../../app/services/LancamentoService'
import LocalStorageService from '../../app/services/LocalStorageService'

import Card from '../../components/Card'
import FormGroup from '../../components/Form-group'
import SelectMenu from '../../components/SelectMenu'
import LancamentoTable from './LancamentoTable'

import { mensagemErro } from '../../components/Toastr'

class ConsultaLancamentos extends React.Component {

    state = {
        ano: null,
        mes: null,
        tipo: null,
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

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

        this.service.consultarLancamentos(usuarioLogado.id, {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo
        }).then(response => {
            console.log(response.data)
            this.setState({ lancamentos: response.data })
        }).catch(error => {
            //console.log(error.response.data)
            //mensagemErro(error.response.data)
        })

    }

    render() {

        const listMeses = [
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

        const listaTiposLancamentos = [
            { value: '', label: 'SELECIONE...' },
            { value: 'RECEITA', label: 'Receita' },
            { value: 'DESPESA', label: 'Despesa' }
        ]

        const lancamentos = [
            { descricao: 'Salario', valor: 100, mes: 1, anos: 2020 },
        ]

        return (
            <Card label="Consulta Lançamentos">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputAno" label="Ano *" >
                                <input type="text"
                                    className="form-control"
                                    id="inputAno"
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
                            <LancamentoTable lancamentos={this.state.lancamentos} />
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(ConsultaLancamentos)