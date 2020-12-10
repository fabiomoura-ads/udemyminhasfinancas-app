import React from 'react'

import LancamentoService from '../../app/services/LancamentoService'

import Card from '../../components/Card'
import FormGroup from '../../components/Form-group'
import SelectMenu from '../../components/SelectMenu'

class CadastrarLancamento extends React.Component {

    state = {
        id: null,
        descricao: '',
        ano: '',
        mes: '',
        tipo: '',
        valor: '',
        status: ''
    }

    constructor() {
        super()
        this.service = new LancamentoService()
    }

    handleChange = (event) => {
        const value = event.target.value
        const name = event.target.name
        this.setState({ [name]: value })
    }

    salvar = () => {
        console.log(this.state)
    }
    
    render() {
        const listaMeses = this.service.obterListaMeses()
        const listaTipo = this.service.obterListaTipos()

        return (
            <Card title="Cadastro de Lançamentos">
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup htmlFor="inputDescricao" label="Descrição *">
                            <input type="text"
                                id="inputDescricao"
                                name="descricao"
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
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup htmlFor="inputMes" label="Mês *">
                            <SelectMenu lista={listaMeses}
                                id="inputMes"
                                name="mes"
                                className="form-control"
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
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputValor" label="Valor *">
                            <input type="text"
                                id="inputValor"
                                name="valor"
                                className="form-control"
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputStatus" label="Status *">
                            <input type="text"
                                id="inputStatus"
                                name="status"
                                className="form-control"
                                disabled />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <button onClick={this.salvar} className="btn btn-success">Salvar</button>
                        <button className="btn btn-danger">Cancelar</button>
                    </div>

                </div>

            </Card>

        )
    }
}

export default CadastrarLancamento