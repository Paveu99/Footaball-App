import "../styles/Base.scss"
import styled from "styled-components"
import { Headline } from "../components/headline/Headline"
import { Players } from "./deeper views/Players"

const PlayersView = styled.div`
  background-color: ${(props) => props.theme.colors.secondaryBackground};
  color: ${(props) => props.theme.colors.secondaryTextColor};
`

export const PlayersBase = () => {
  return (
    <PlayersView className="base">
      <Headline text="Players" />
      <Players />
    </PlayersView>
  )
}
