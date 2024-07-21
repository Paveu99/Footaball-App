import styled from "styled-components"
import "../styles/Base.scss"
import { Headline } from "../components/headline/Headline"

const TeamsView = styled.div`
  background-color: ${(props) => props.theme.colors.secondaryBackground};
  color: ${(props) => props.theme.colors.secondaryTextColor};
`

export const TeamsBase = () => {
  console.log("teams")

  return (
    <TeamsView className="base">
      <Headline text="Teams" />
    </TeamsView>
  )
}
