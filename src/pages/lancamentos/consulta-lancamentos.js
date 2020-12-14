import React from 'react'
import { withRouter } from 'react-router-dom'

import Card from '../../components/Card'
import FormGroup from '../../components/Form-group'
import SelectMenu from '../../components/SelectMenu'
import LancamentoTable from './LancamentoTable'
import LancamentoService from '../../app/services/LancamentoService'
import LocalStorageService from '../../app/services/LocalStorageService'

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import * as messages from '../../components/Toastr'

class ConsultaLancamentos extends React.Component {

    state = {
        ano: (new Date()).getFullYear(),
        mes: null,
        tipo: null,
        descricao: null,
        exibeConfirmacaoDelecao: false,
        lancamentoDeletar: null,
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

        if (!this.state.ano) {
            messages.mensagemErro('Ano é obrigatório para pesquisa.')
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
                if (response.data.length === 0) {
                    messages.mensagemAlerta('Nenhum lançamento encontrado.')
                }
                this.setState({ lancamentos: response.data })
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })

    }

    deletarLancamento = () => {

        this.service
            .deletar(this.state.lancamentoDeletar.id)
            .then(response => {
                messages.mensagemSucesso("Lançamento excluído com sucesso!")

                const lancamentos = this.state.lancamentos
                lancamentos.splice(lancamentos.indexOf(this.state.lancamentoDeletar), 1)

                this.setState({ lancamentos: lancamentos, exibeConfirmacaoDelecao: false, lancamentoDeletar: null })

            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }

    onHideConfirmDelete = () => {
        this.setState({ exibeConfirmacaoDelecao: false, lancamentoDeletar: null })
    }

    onShowConfirmDelete = (lancamento) => {
        this.setState({ exibeConfirmacaoDelecao: true, lancamentoDeletar: lancamento })
    }

    cadastrarLancamento = () => {
        this.props.history.push('cadastrar-lancamento');
    }

    onEditLancamento = (lancamento) => {
        this.props.history.push(`cadastrar-lancamento/${lancamento.id}`)
    }

    atualizarStatus = (lancamento, status) => {
        this.service.atualizarStatus(lancamento.id, status)
            .then(response => {
                const lancamentos = this.state.lancamentos

                lancamento.status = status
                lancamentos[lancamentos.indexOf(lancamento)] = lancamento
                this.setState({ lancamentos })

                messages.mensagemSucesso(`Lançamento ${status} com sucesso!`)

            })
            .catch(error => {
                messages.mensagemErro(`Não foi possível ${status} o lançameno!`)
            })
    }

    render() {

        const listMeses = this.service.obterListaMeses();

        const listaTiposLancamentos = this.service.obterListaTipos()

        const confirmDeleteActions = (
            <div>
                <Button label="Sim" icon="pi pi-check" onClick={this.deletarLancamento} />
                <Button label="Não" icon="pi pi-times" className="p-button-secondary" onClick={this.onHideConfirmDelete} />
            </div>
        );

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
                            <button onClick={this.buscarLancamentos} className="btn btn-success"><i className="pi pi-search"></i> Buscar</button>
                            <button onClick={this.cadastrarLancamento} className="btn btn-danger"><i className="pi pi-plus"></i> Cadastrar</button>
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
                                deleteAction={this.onShowConfirmDelete}
                                editAction={this.onEditLancamento}
                                updateStatusAction={this.atualizarStatus} />
                        </div>
                    </div>
                </div>
                <div>
                    <Dialog header="Confirmação!"
                        visible={this.state.exibeConfirmacaoDelecao}
                        style={{ width: '50vw' }}
                        modal={true}
                        footer={confirmDeleteActions}
                        onHide={() => this.onHideConfirmDelete()}>
                        <p>Confirma a deleção deste lancamento?</p>
                    </Dialog>
                </div>
            </Card>
        )
    }
}

export default withRouter(ConsultaLancamentos)