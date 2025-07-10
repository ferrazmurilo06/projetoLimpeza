// dentro de src/App.jsx

import Navbar from './componentes/Navbar.jsx' // 1. Importamos o seu novo componente Navbar
import './App.css'                           // Importamos o CSS principal

function App() {
  return (
    <div className="App">
      {/* 2. Colocamos o Navbar para ser renderizado no topo da página */}
      <Navbar />

      {/* 3. Criamos uma área para o conteúdo principal */}
      <main style={{ paddingTop: '80px' }}> {/* Dica importante abaixo! */}
        <h1>Bem-vindo ao nosso App!</h1>
        <p>Aqui aparecerá o conteúdo de cada página (a lista, o formulário, etc.)</p>
      </main>
    </div>
  )
}

export default App
