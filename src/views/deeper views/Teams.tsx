import { useState } from "react"
import "../../styles/MainDisplay.scss"
import styled from "styled-components"
import { Team } from "../../utils/types"
import { Button } from "../../components/buttons/Button"
import { TeamsList } from "../../components/lists/teams/TeamsList"
import { AddTeamForm } from "../../components/add forms/AddTeamForm"
import { EditTeamForm } from "../../components/edit forms/EditTeamsForm"

const TeamsSegment = styled.div`
  background-color: ${(props) => props.theme.colors.switchBgc};
`

export const Teams = () => {
  const [chosenTeam, setChosenTeam] = useState<Team>({
    id: "",
    team_location: "",
    team_name: "",
    team_year: 0,
    total_goals: 0,
  })

  const clear = () => {
    setChosenTeam({
      id: "",
      team_location: "",
      team_name: "",
      team_year: 0,
      total_goals: 0,
    })
  }

  const teamDetails = (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginRight: "10px",
        }}
      >
        <h3>Chosen team:</h3>
        <Button view="Close" onClick={clear} />
      </div>
      <EditTeamForm team={chosenTeam} clearForm={clear} />
    </div>
  )

  return (
    <div className="container">
      <TeamsSegment className="container__segment">
        <h3>Teams list:</h3>
        <TeamsList setChosenTeam={setChosenTeam} />
      </TeamsSegment>
      <TeamsSegment className="container__segment">
        {chosenTeam.id.length > 0 && teamDetails}
      </TeamsSegment>
      <TeamsSegment className="container__segment">
        <h3>Add team:</h3>
        <AddTeamForm />
      </TeamsSegment>
    </div>
  )
}
