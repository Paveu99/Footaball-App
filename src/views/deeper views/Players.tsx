import { useState } from "react"
import "../../styles/Players.scss"
import styled from "styled-components"
import { Player } from "../../utils/types"
import { AddPlayerForm } from "../../components/add forms/AddPlayerForm"
import { PlayersList } from "../../components/lists/PlayersList"

const PlayersSegment = styled.div`
  background-color: ${(props) => props.theme.colors.switchBgc};
`

export const Players = () => {
  const [chosenPlayer, setChosenPlayer] = useState<Player | null>(null)

  const playerDetails = (
    <div>
      <div>Chosen player</div>
      <button onClick={() => setChosenPlayer(null)}>Close</button>
    </div>
  )

  return (
    <div className="players">
      <PlayersSegment className="players__segment">
        <h3>Players list:</h3>
        <PlayersList setChosenPlayer={setChosenPlayer} />
      </PlayersSegment>
      <PlayersSegment className="players__segment">
        {chosenPlayer && playerDetails}
      </PlayersSegment>
      <PlayersSegment className="players__segment">
        <h3>Add player:</h3>
        <AddPlayerForm />
      </PlayersSegment>
    </div>
  )
}
