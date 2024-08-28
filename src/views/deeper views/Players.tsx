import { useState } from "react"
import "../../styles/MainDisplay.scss"
import styled from "styled-components"
import { Player } from "../../utils/types"
import { AddPlayerForm } from "../../components/add forms/AddPlayerForm"
import { PlayersList } from "../../components/lists/players/PlayersList"
import { EditPlayerForm } from "../../components/edit forms/EditPlayerForm"
import { Button } from "../../components/buttons/Button"

const PlayersSegment = styled.div`
  background-color: ${(props) => props.theme.colors.switchBgc};
`

export const Players = () => {
  const [chosenPlayer, setChosenPlayer] = useState<Player>({
    id: "",
    player_name: "",
    player_surname: "",
    teamId: "",
  })

  const clear = () => {
    setChosenPlayer({
      id: "",
      player_name: "",
      player_surname: "",
      teamId: "",
    })
  }

  const playerDetails = (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginRight: "10px",
        }}
      >
        <h3>Chosen player:</h3>
        <Button view="Close" onClick={clear} />
      </div>
      <EditPlayerForm player={chosenPlayer} clearForm={clear} />
    </div>
  )

  return (
    <div className="container">
      <PlayersSegment className="container__segment">
        <h3>Players list:</h3>
        <PlayersList setChosenPlayer={setChosenPlayer} />
      </PlayersSegment>
      <PlayersSegment className="container__segment">
        {chosenPlayer.id.length > 0 && playerDetails}
      </PlayersSegment>
      <PlayersSegment className="container__segment">
        <h3>Add player:</h3>
        <AddPlayerForm />
      </PlayersSegment>
    </div>
  )
}
