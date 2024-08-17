import styled from "styled-components"
import { Team } from "../../../utils/types"

type Props = {
  singleTeam: Team
  index: number
  chosenTeam: (team: Team) => void
}

const SingleRow = styled.div`
  background-color: ${(props) => props.theme.colors.secondaryBackground};
  color: ${(props) => props.theme.colors.primaryTextColor};
`

export const SingleTeam = ({ singleTeam, chosenTeam, index }: Props) => {
  return (
    <SingleRow className="single-player" onClick={() => chosenTeam(singleTeam)}>
      {index}. {singleTeam.team_name}
    </SingleRow>
  )
}
