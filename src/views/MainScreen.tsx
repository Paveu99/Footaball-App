import { useState } from "react"
import { Views } from "../utils/types"
import { Switch } from "../components/switch/Switch"
import "../styles/MainScreen.scss"
import { TeamsBase } from "./TeamsBase"
import { GamesBase } from "./GamesBase"
import { Stats } from "./Stats"
import { PlayersBase } from "./PlayersBase"

export const MainScreen = () => {
  const [view, setView] = useState<Views>("a")

  console.log("main")

  return (
    <div className="main-screen">
      <Switch changeView={setView} />
      {view === "b" ? (
        <TeamsBase />
      ) : view === "c" ? (
        <GamesBase />
      ) : view === "d" ? (
        <Stats />
      ) : (
        <PlayersBase />
      )}
    </div>
  )
}
