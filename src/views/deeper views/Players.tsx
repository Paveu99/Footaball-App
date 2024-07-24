import { useEffect, useState } from "react"
import "../../styles/Players.scss"
import styled from "styled-components"
import { Player } from "../../utils/types"
import { AddPlayerForm } from "../../components/add forms/AddPlayerForm"
import { PlayersList } from "../../components/lists/PlayersList"
import { EditPlayerForm } from "../../components/edit forms/EditPlayerForm"

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

  const playerDetails = (
    <>
      <h3>Chosen player:</h3>
      <button
        onClick={() =>
          setChosenPlayer({
            id: "",
            player_name: "",
            player_surname: "",
            teamId: "",
          })
        }
      >
        Close
      </button>
      <EditPlayerForm
        player={chosenPlayer}
        clearForm={() =>
          setChosenPlayer({
            id: "",
            player_name: "",
            player_surname: "",
            teamId: "",
          })
        }
      />
    </>
  )

  useEffect(() => {
    console.log(chosenPlayer)
  }, [chosenPlayer])

  return (
    <div className="players">
      <PlayersSegment className="players__segment">
        <h3>Players list:</h3>
        <PlayersList setChosenPlayer={setChosenPlayer} />
      </PlayersSegment>
      <PlayersSegment className="players__segment">
        {chosenPlayer.id.length > 0 && playerDetails}
      </PlayersSegment>
      <PlayersSegment className="players__segment">
        <h3>Add player:</h3>
        <AddPlayerForm />
      </PlayersSegment>
    </div>
  )
}
