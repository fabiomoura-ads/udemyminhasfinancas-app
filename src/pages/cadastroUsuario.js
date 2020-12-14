import React from 'react'
import { withRouter } from 'react-router-dom'

import UsuarioService from '../app/services/UsuarioService'

import Card from '../components/Card'
import FormGroup from '../components/Form-group'
import * as messages from '../components/Toastr'

class CadastroUsuario extends React.Component {

    state = {
        nome: '',
        email: '',
        senha: '',
        confirmacaoSenha: ''
    }

    constructor() {
        super();
        this.service = new UsuarioService();
    }

    cancelar = () => {
        this.props.history.push('/login')
    }

    cadastrarUsuario = () => {

        const { nome, email, senha, confirmacaoSenha } = this.state
        const usuario = { nome, email, senha, confirmacaoSenha }

        try {

            this.service.validar(usuario);

        } catch (erro) {
            erro.mensagens.forEach(msg => { messages.mensagemErro(msg) })

            return false
        }

        this.service.salvar(usuario)
            .then(response => {
                messages.mensagemSucesso("Usuário cadastrado com sucesso!");
                this.props.history.push('/login')
            }).catch(error => {
                messages.mensagemErro(error.response.data);
            })

    }

    render() {
        return (
            <Card title="Cadastro de Usuário">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <fieldset>
                                <FormGroup htmlFor="inputNome" label="Nome *">
                                    <input type="text"
                                        className="form-control"
                                        id="inputNome"
                                        onChange={e => this.setState({ nome: e.target.value })}
                                        placeholder="Digite o Nome" />
                                </FormGroup>
                                <FormGroup htmlFor="inputEmail" label="Email *">
                                    <input type="email"
                                        className="form-control"
                                        id="inputEmail"
                                        onChange={e => this.setState({ email: e.target.value })}
                                        placeholder="Digite o Email" />
                                </FormGroup>
                                <FormGroup htmlFor="inputSenha" label="Senha *">
                                    <input type="password"
                                        className="form-control"
                                        id="inputSenha"
                                        onChange={e => this.setState({ senha: e.target.value })}
                                        placeholder="Digite a Senha" />
                                </FormGroup>
                                <FormGroup htmlFor="inputConfirmacaoDeSenha" label="Repita a Senha *">
                                    <input type="password"
                                        className="form-control"
                                        id="inputConfirmacaoDeSenha"
                                        onChange={e => this.setState({ confirmacaoSenha: e.target.value })}
                                        placeholder="Repita a Senha" />
                                </FormGroup>
                                <button onClick={this.cadastrarUsuario} 
                                    className="btn btn-success">
                                        <i className="pi pi-save"></i> Salvar
                                        </button>
                                <button onClick={this.cancelar} 
                                className="btn btn-danger">
                                    <i className="pi pi-times"></i>Cancelar
                                    </button>
                            </fieldset>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroUsuario)