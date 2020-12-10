import { Route, Switch, HashRouter } from 'react-router-dom'

import Home from '../pages/home'
import Login from '../pages/login'
import CadastroUsuario from '../pages/cadastroUsuario'

function Rotas(){
    return(
        <HashRouter>
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuarios" component={CadastroUsuario} />
            </Switch>
        </HashRouter>        
    )
}

export default Rotas;


