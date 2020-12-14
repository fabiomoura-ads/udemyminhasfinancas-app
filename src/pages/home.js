import React from 'react'
import UsuarioService from '../app/services/UsuarioService'
import { AuthContext } from '../main/provedorAutenticacao'

class Home extends React.Component {

    state = {
        usuario: null,
        saldo: 0
    }

    constructor() {
        super()
        this.service = new UsuarioService()
    }

    componentDidMount() {
        console.log('aaaaaHOME')
        const usuarioLogado = this.context.usuarioAutenticado

        if (!usuarioLogado) {
            this.props.history.push("/login");
        }

        this.setState({ usuario: usuarioLogado });

        this.service.buscaSaldo({
            id: usuarioLogado.id
        }).then(response => {
            this.setState({ saldo: response.data })
        }).catch(error => {
            console.log(error.response)
        })
    }

    render() {
        return (
            <div className="jumbotron">
                <h1 className="display-3">Bem vindo!</h1>
                <p className="lead">Esse é seu sistema de finanças.</p>
                <p className="lead">Seu saldo para o mês atual é de R$ {this.state.saldo}</p>
                <hr className="my-4" />
                <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                <p className="lead">
                    <a className="btn btn-primary btn-lg"
                        href="#/cadastro-usuarios"
                        role="button"><i className="fa fa-users"></i>
                        Cadastrar Usuário
                    </a>
                    <a className="btn btn-danger btn-lg"
                        href="#/cadastrar-lancamento"
                        role="button"><i className="fa fa-users"></i>
                        Cadastrar Lançamento
                    </a>
                </p>
            </div>
        )
    }
}

Home.contextType = AuthContext

export default Home