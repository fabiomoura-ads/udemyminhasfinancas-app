import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'

import Home from '../pages/home'
import Login from '../pages/login'
import CadastroUsuario from '../pages/cadastroUsuario'
import ConsultaLancamentos from '../pages/lancamentos/consulta-lancamentos'
import CadastrarLancamentos from '../pages/lancamentos/cadastrar-lancamento'
import { AuthContext } from './provedorAutenticacao'

function RotaAutenticada({ component: Component, isUsuarioAutenticado, ...props }) {

    return (
        <Route {...props} render={(componentProps) => {
            if (isUsuarioAutenticado) {
                return (
                    <Component {...componentProps} />
                )
            } else {
                return (
                    <Redirect to={{ pathname: '/login', state: { from: componentProps.location } }} />
                )
            }
        }} />
    )
}

function Rotas(props) {
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuarios" component={CadastroUsuario} />

                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/home" component={Home} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consulta-lancamentos" component={ConsultaLancamentos} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastrar-lancamento/:id?" component={CadastrarLancamentos} />
            </Switch>
        </HashRouter>
    )
}

export default () => (
    <AuthContext.Consumer>
        { context => ( <Rotas isUsuarioAutenticado={context.isAutenticado} /> )}
    </AuthContext.Consumer>
)


