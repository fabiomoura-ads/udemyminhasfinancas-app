import { Route, Switch, HashRouter } from 'react-router-dom'

import Home from '../pages/home'
import Login from '../pages/login'
import CadastroUsuario from '../pages/cadastroUsuario'
import ConsultaLancamentos from '../pages/lancamentos/consulta-lancamentos'
import CadastrarLancamentos from '../pages/lancamentos/cadastrar-lancamento'

function Rotas(){
    return(
        <HashRouter>
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuarios" component={CadastroUsuario} />
                <Route path="/consulta-lancamentos" component={ConsultaLancamentos} />
                <Route path="/cadastro-lancamentos" component={CadastrarLancamentos} />
            </Switch>
        </HashRouter>        
    )
}

export default Rotas;


