import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../components/Card'
import FormGroup from '../components/Form-group'

class CadastroUsuario extends React.Component{

    state = {
        nome: '',
        email: '',
        senha: '',
        confirmacaoSenha: ''
    }

    cancelar = () => {
        this.props.history.push('/login')
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
                                            value={this.state.nome}
                                            onChange={e => this.setState({nome: e.target.velue})}
                                            placeholder="Digite o Nome" />
                                </FormGroup>
                                <FormGroup htmlFor="inputEmail" label="Email *">
                                    <input  type="email" 
                                            className="form-control" 
                                            id="inputEmail" 
                                            value={this.state.email}
                                            onChange={e => this.setState({email: e.target.velue})}                                            
                                            placeholder="Digite o Email" />
                                </FormGroup>
                                <FormGroup htmlFor="inputSenha" label="Senha *">
                                    <input  type="password" 
                                            className="form-control" 
                                            id="inputSenha" 
                                            value={this.state.senha}
                                            onChange={e => this.setState({senha: e.target.velue})}
                                            placeholder="Digite a Senha" />
                                </FormGroup>
                                <FormGroup htmlFor="inputConfirmacaoDeSenha" label="Repita a Senha *">
                                    <input  type="password" 
                                            className="form-control" 
                                            id="inputConfirmacaoDeSenha" 
                                            value={this.state.confirmacaoSenha}
                                            onChange={e => this.setState({confirmacaoSenha: e.target.velue})}
                                            placeholder="Repita a Senha" />
                                </FormGroup>
                                <button onClick={this.salvar} className="btn btn-success">Salvar</button>                                                   
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