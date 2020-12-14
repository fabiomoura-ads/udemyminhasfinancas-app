import Rotas from './rotas'
import Navbar from '../components/Navbar'
import ProvedorAutenticacao from './provedorAutenticacao'
import 'toastr/build/toastr.min.js'

import 'bootswatch/dist/flatly/bootstrap.css';
import '../custom.css'
import 'toastr/build/toastr.css'

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function App() {
  return (
    <ProvedorAutenticacao>
      <Navbar />
      <div className="container">
        <Rotas />
      </div>
    </ProvedorAutenticacao>
  );
}

export default App;
