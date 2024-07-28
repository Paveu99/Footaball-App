import { useState } from "react"
import "../../styles/Players.scss"
import styled from "styled-components"
import { Player } from "../../utils/types"
import { EditPlayerForm } from "../../components/edit forms/EditPlayerForm"
import { Button } from "../../components/buttons/Button"

const TeamsSegment = styled.div`
  background-color: ${(props) => props.theme.colors.switchBgc};
`

export const Teams = () => {
  const [chosenTeam, setChosenTeam] = useState<Player>({
    id: "",
    player_name: "",
    player_surname: "",
    teamId: "",
  })

  const clear = () => {
    setChosenTeam({
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
      <EditPlayerForm player={chosenTeam} clearForm={clear} />
    </div>
  )

  return (
    <div className="players">
      <TeamsSegment className="players__segment">
        <h3>Teams list:</h3>
        {/* <PlayersList setChosenPlayer={setChosenPlayer} /> */}
      </TeamsSegment>
      <TeamsSegment className="players__segment">
        {chosenTeam.id.length > 0 && playerDetails}
      </TeamsSegment>
      <TeamsSegment className="players__segment">
        <h3>Add team:</h3>
        {/* <AddPlayerForm /> */}
      </TeamsSegment>
    </div>
  )
}
