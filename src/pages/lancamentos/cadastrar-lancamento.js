import React from 'react'
import { withRouter } from 'react-router-dom'
import LancamentoService from '../../app/services/LancamentoService'

import Card from '../../components/Card'
import FormGroup from '../../components/Form-group'
import SelectMenu from '../../components/SelectMenu'
import * as messages from '../../components/Toastr'
import LocalStorageService from '../../app/services/LocalStorageService'

class CadastrarLancamento extends React.Component {

    state = {
        id: null,
        descricao: '',
        ano: '',
        mes: '',
        tipo: '',
        valor: '',
        status: '',
        usuari: null,
        atualizando: false
    }

    constructor() {
        super()
        this.service = new LancamentoService()
        this.usuarioLogado = LocalStorageService.obterItem('_usuario_logado')
    }

    componentDidMount() {

        const params = this.props.match.params;

        if (params.id) {

            const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

            this.service.obterPorId(params.id, usuarioLogado.id)
                .then(response => {
                    console.log(response.data)
                    this.setState({ ...response.data, atualizando: true })
                })
                .catch(error => {
                    console.log(error.response.data)
                })
        }

    }

    handleChange = (event) => {
        const value = event.target.value
        const name = event.target.name
        this.setState({ [name]: value })
    }

    salvar = () => {

        const { descricao, ano, mes, tipo, valor } = this.state

        const lancamento = { descricao, ano, mes, tipo, valor, usuario: this.usuarioLogado.id }

        try {

            this.service.validar(lancamento);

        } catch (erro) {
            erro.mensagens.forEach(msg => { messages.mensagemErro(msg) })

            return false
        }

        this.service.salvar(lancamento)
            .then(response => {
                this.props.history.push('/consulta-lancamentos')
                messages.mensagemSucesso('Lançamento cadastrado com sucesso!')
            })
            .catch(error => {
                messages.mensagemErro(error.response.data)
            })

    }

    atualizar = () => {

        const { id, descricao, ano, mes, tipo, valor, status } = this.state

        const lancamento = { id, descricao, ano, mes, tipo, valor, status, usuario: this.state.usuario.id }

        try {

            this.service.validar(lancamento);

        } catch (erro) {
            erro.mensagens.forEach(msg => { messages.mensagemErro(msg) })

            return false
        }

        this.service.atualizar(lancamento)
            .then(response => {
                this.props.history.push('/consulta-lancamentos')
                messages.mensagemSucesso('Lançamento atualizado com sucesso!')
            })
            .catch(error => {
                messages.mensagemErro(error.response.data)
            })

    }

    render() {
        const listaMeses = this.service.obterListaMeses()
        const listaTipo = this.service.obterListaTipos()

        return (
            <Card title={this.state.atualizando ? "Atualização de Lançamento" : "Cadastro de Lançamentos"}>
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup htmlFor="inputDescricao" label="Descrição *">
                            <input type="text"
                                id="inputDescricao"
                                name="descricao"
                                value={this.state.descricao}
                                className="form-control"
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup htmlFor="inputAno" label="Ano *">
                            <input type="text"
                                id="inputAno"
                                name="ano"
                                className="form-control"
                                value={this.state.ano}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup htmlFor="inputMes" label="Mês *">
                            <SelectMenu lista={listaMeses}
                                id="inputMes"
                                name="mes"
                                className="form-control"
                                value={this.state.mes}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputTipo" label="Tipo *">
                            <SelectMenu lista={listaTipo}
                                id="inputTipo"
                                name="tipo"
                                className="form-control"
                                value={this.state.tipo}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputValor" label="Valor *">
                            <input type="text"
                                id="inputValor"
                                name="valor"
                                className="form-control"
                                value={this.state.valor}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputStatus" label="Status *">
                            <input type="text"
                                id="inputStatus"
                                name="status"
                                value={this.state.status}
                                className="form-control"
                                disabled />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">

                        {this.state.atualizando ?

                            <button onClick={this.atualizar}
                                className="btn btn-success">
                                <i className="pi pi-refresh"></i> Atualizar
                            </button>
                            :
                            <button onClick={this.salvar}
                                className="btn btn-success">
                                <i className="pi pi-save"></i> Salvar'
                            </button>

                        }

                        <button onClick={e => this.props.history.push('/consulta-lancamentos')}
                            className="btn btn-danger"><i className="pi pi-times"></i> Cancelar
                            </button>
                    </div>

                </div>

            </Card>

        )
    }
}

export default withRouter(CadastrarLancamento)