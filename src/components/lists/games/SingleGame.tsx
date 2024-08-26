import styled from "styled-components"
import { Game } from "../../../utils/types"

type Props = {
  singleGame: Game
  index: number
  chosenGame: (team: Game) => void
}

const SingleRow = styled.div`
  background-color: ${(props) => props.theme.colors.secondaryBackground};
  color: ${(props) => props.theme.colors.primaryTextColor};
`

export const SingleGame = ({ singleGame, chosenGame, index }: Props) => {
  return (
    <SingleRow className="single-player" onClick={() => chosenGame(singleGame)}>
      {index}. {singleGame.game_name}
    </SingleRow>
  )
}
