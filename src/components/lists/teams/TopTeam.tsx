import styled from "styled-components"
import { Team } from "../../../utils/types"

type Props = {
  singleTeam: Team
  index: number
}

const SingleRow = styled.div`
  background-color: ${(props) => props.theme.colors.secondaryBackground};
  color: ${(props) => props.theme.colors.primaryTextColor};
`

export const TopTeam = ({ singleTeam, index }: Props) => {
  return (
    <SingleRow className="single-element">
      {index}. {singleTeam.team_name} -{" "}
      <span style={{ fontWeight: "bold" }}>{singleTeam.total_goals}</span>
    </SingleRow>
  )
}
