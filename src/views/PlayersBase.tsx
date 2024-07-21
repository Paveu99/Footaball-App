import { memo } from "react"
import "../styles/Base.scss"
import styled from "styled-components"
import { Headline } from "../components/headline/Headline"

const PlayersView = styled.div`
  background-color: ${(props) => props.theme.colors.secondaryBackground};
  color: ${(props) => props.theme.colors.secondaryTextColor};
`

export const PlayersBase = memo(() => {
  console.log("players")

  return (
    <PlayersView className="base">
      <Headline text="Players" />
    </PlayersView>
  )
})
