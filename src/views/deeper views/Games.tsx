import { useState } from "react"
import "../../styles/MainDisplay.scss"
import styled from "styled-components"
import { Game } from "../../utils/types"
import { Button } from "../../components/buttons/Button"
import { AddGameForm } from "../../components/add forms/AddGameForm"
import { GamesList } from "../../components/lists/games/GamesList"
import { EditGameForm } from "../../components/edit forms/EditGameForm"

const GamesSegment = styled.div`
  background-color: ${(props) => props.theme.colors.switchBgc};
`

export const Games = () => {
  const [chosenGame, setChosenGame] = useState<Game>({
    id: "",
    game_date: "",
    game_name: "",
    game_place: "",
    game_time: 0,
    team_a: "",
    team_b: "",
    team_a_goals: 0,
    team_b_goals: 0,
  })

  const clear = () => {
    setChosenGame({
      id: "",
      game_date: "",
      game_name: "",
      game_place: "",
      game_time: 0,
      team_a: "",
      team_b: "",
      team_a_goals: 0,
      team_b_goals: 0,
    })
  }

  const gameDetails = (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginRight: "10px",
        }}
      >
        <h3>Chosen game:</h3>
        <Button view="Close" onClick={clear} />
      </div>
      <EditGameForm game={chosenGame} clearForm={clear} />
    </div>
  )

  return (
    <div className="container">
      <GamesSegment className="container__segment">
        <h3>Games list:</h3>
        <GamesList setChosenGame={setChosenGame} />
      </GamesSegment>
      <GamesSegment className="container__segment">
        {chosenGame.id.length > 0 && gameDetails}
      </GamesSegment>
      <GamesSegment className="container__segment">
        <h3>Add game:</h3>
        <AddGameForm />
      </GamesSegment>
    </div>
  )
}
