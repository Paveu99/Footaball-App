import { memo } from "react"
import "../styles/Base.scss"
import styled from "styled-components"

const PlayersView = styled.div`
  background-color: ${(props) => props.theme.colors.secondaryBackground};
  color: ${(props) => props.theme.colors.secondaryTextColor};
`

export const PlayersBase = memo(() => {
  console.log("players")

  return <PlayersView className="base">Players</PlayersView>
})
