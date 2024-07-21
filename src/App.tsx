import "./App.scss"
import { MainScreen } from "./views/MainScreen"
import { Header } from "./views/Header"
import { Footer } from "./views/Footer"

function App() {
  return (
    <div className="App">
      <Header />
      <MainScreen />
      <Footer />
    </div>
  )
}

export default App
