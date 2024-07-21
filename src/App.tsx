import "./App.scss"
import { MainScreen } from "./views/MainScreen"
import { Header } from "./views/Header"
import { Footer } from "./views/Footer"
import { useState } from "react"
import { createGlobalStyle, ThemeProvider } from "styled-components"
import { Theme } from "./utils/types"

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.colors.primaryBackground};
    transition: background-color 0.3s, color 0.3s;
  }
`

function App() {
  const [currentTheme, setCurrentTheme] = useState<Theme>("light")

  const light = {
    colors: {
      primaryBackground: "green",
      secondaryBackground: "white",
      textBackground: "#333",
      primaryTextColor: "green",
      secondaryTextColor: "black",
      mainScreenBgc: "white",
      switchBgc: "#dbdbdb",
      switchBgcHover: "#ebebeb",
    },
  }

  const dark = {
    colors: {
      primaryBackground: "#232424",
      secondaryBackground: "#2a2b2b",
      primaryTextColor: "#4fd600",
      secondaryTextColor: "white",
      mainScreenBgc: "#2a2b2b",
      switchBgc: "#6b6b6b",
      switchBgcHover: "#232424",
    },
  }

  const toogleTheme = () => {
    currentTheme === "light"
      ? setCurrentTheme("dark")
      : setCurrentTheme("light")
  }

  return (
    <ThemeProvider theme={currentTheme === "light" ? light : dark}>
      <GlobalStyle />
      <div className="App">
        <Header themeChange={toogleTheme} theme={currentTheme} />
        <MainScreen />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
