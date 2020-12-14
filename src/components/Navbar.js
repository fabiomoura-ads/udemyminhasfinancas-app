import React from 'react'
import NavbarItem from './NavbarItem'
import AuthService from '../app/services/AuthService'
import { AuthContext } from '../main/provedorAutenticacao'

const logout = () => {
    AuthService.removerUsuarioAutenticado()
}

function Navbar(props) {

    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
            <div className="container">
                <a href={props.isUsuarioAutenticado ? "#/home" : "#/login"}
                    className="navbar-brand"
                >Minhas Finanças</a>
                <button className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarResponsive"
                    aria-controls="navbarResponsive"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav">
                        <NavbarItem render={props.isUsuarioAutenticado} link="#/home" label="Home" />
                        <NavbarItem render={props.isUsuarioAutenticado} link="#/cadastro-usuarios" label="Usuários" />
                        <NavbarItem render={props.isUsuarioAutenticado} link="#/consulta-lancamentos" label="Lançamentos" />
                        <NavbarItem render={props.isUsuarioAutenticado} onClick={props.deslogar} link="#/login" label="Logout" />
                    </ul>
                </div>
            </div>
        </div>

    )
}

export default () => (
    <AuthContext.Consumer>
        { context => (<Navbar isUsuarioAutenticado={context.isAutenticado} deslogar={context.encerrarSessao} />)}
    </AuthContext.Consumer>
)