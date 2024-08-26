import styled from "styled-components"
import "../styles/Base.scss"
import { Headline } from "../components/headline/Headline"
import { Games } from "./deeper views/Games"

const GamesView = styled.div`
  background-color: ${(props) => props.theme.colors.secondaryBackground};
  color: ${(props) => props.theme.colors.secondaryTextColor};
`

export const GamesBase = () => {
  return (
    <GamesView className="base">
      <Headline text="Games" />
      <Games />
    </GamesView>
  )
}
