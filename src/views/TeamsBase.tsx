import "../styles/Base.scss"
import styled from "styled-components"
import { Headline } from "../components/headline/Headline"
import { Teams } from "./deeper views/Teams"

const PlayersView = styled.div`
  background-color: ${(props) => props.theme.colors.secondaryBackground};
  color: ${(props) => props.theme.colors.secondaryTextColor};
`

export const TeamsBase = () => {
  return (
    <PlayersView className="base">
      <Headline text="Teams" />
      <Teams />
    </PlayersView>
  )
}
