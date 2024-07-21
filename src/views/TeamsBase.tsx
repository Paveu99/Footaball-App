import styled from "styled-components"
import "../styles/Base.scss"

const TeamsView = styled.div`
  background-color: ${(props) => props.theme.colors.secondaryBackground};
  color: ${(props) => props.theme.colors.secondaryTextColor};
`

export const TeamsBase = () => {
  console.log("teams")

  return <TeamsView className="base">Teams</TeamsView>
}
