import React from 'react'
import { withRouter } from 'react-router-dom'

import UsuarioService from '../app/services/UsuarioService'

import Card from '../components/Card'
import FormGroup from '../components/Form-group'
import { mensagemAlerta, mensagemErro, mensagemSucesso } from '../components/Toastr'

class CadastroUsuario extends React.Component{

    state = {
        nome: '',
        email: '',
        senha: '',
        confirmacaoSenha: ''
    }

    constructor(){
        super();
        this.service = new UsuarioService();        
    }

    cancelar = () => {
        this.props.history.push('/login')
    }

    validaDados = () => {
        
        const msg = [];

        if ( !this.state.nome.toString().trim() ){
            msg.push("Nome é obrigatório e não foi informado.");
        }

        if ( !this.state.email.toString().trim() ){
            msg.push("Email é obrigatório e não foi informado.");
        } else if (  !this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/) ){
            msg.push("Email não é válido.");
        }

        if ( !this.state.senha.toString().trim() || !this.state.confirmacaoSenha.toString().trim()  ) {
            msg.push("Senha ou confirmação de senha não informado.");
        } else if ( this.state.senha.toString().trim()  != this.state.confirmacaoSenha.toString().trim()  ) {
            msg.push("Confirmação de senha não confere.");            
        }

        return msg;
        
    }

    cadastrarUsuario = () => {

        const arErros = this.validaDados();

        if (arErros.length > 0 ) {
            arErros.forEach(msg => {
                mensagemErro(msg)
            })
            return false;
        }

        this.service.salvar({
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha
        }).then(response => {
            mensagemSucesso("Usuário cadastrado com sucesso!");
            this.props.history.push('/login')
        }).catch(error => {
            mensagemErro(error.response.data);
        })
            
    }

    render(){
        return(
            <Card title="Cadastro de Usuário">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <fieldset>
                                <FormGroup htmlFor="inputNome" label="Nome *">
                                    <input  type="text" 
                                            className="form-control" 
                                            id="inputNome" 
                                            onChange={e => this.setState({nome: e.target.value})}
                                            placeholder="Digite o Nome" />
                                </FormGroup>
                                <FormGroup htmlFor="inputEmail" label="Email *">
                                    <input  type="email" 
                                            className="form-control" 
                                            id="inputEmail" 
                                            onChange={e => this.setState({email: e.target.value})}                                            
                                            placeholder="Digite o Email" />
                                </FormGroup>
                                <FormGroup htmlFor="inputSenha" label="Senha *">
                                    <input  type="password" 
                                            className="form-control" 
                                            id="inputSenha" 
                                            onChange={e => this.setState({senha: e.target.value})}
                                            placeholder="Digite a Senha" />
                                </FormGroup>
                                <FormGroup htmlFor="inputConfirmacaoDeSenha" label="Repita a Senha *">
                                    <input  type="password" 
                                            className="form-control" 
                                            id="inputConfirmacaoDeSenha" 
                                            onChange={e => this.setState({confirmacaoSenha: e.target.value})}
                                            placeholder="Repita a Senha" />
                                </FormGroup>
                                <button onClick={this.cadastrarUsuario} className="btn btn-success">Salvar</button>                                                   
                                <button onClick={this.cancelar} className="btn btn-danger">Cancelar</button>                                                                                   
                            </fieldset>
                        </div>
                    </div>
                </div>                        
            </Card>
        )
    }
}

export default withRouter(CadastroUsuario)