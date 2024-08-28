import styled from "styled-components"
import { Player } from "../../../utils/types"

type Props = {
  singlePlayer: Player
  index: number
  chosenPerson: (player: Player) => void
}

const SingleRow = styled.div`
  background-color: ${(props) => props.theme.colors.secondaryBackground};
  color: ${(props) => props.theme.colors.primaryTextColor};
`

export const SinglePlayer = ({ singlePlayer, chosenPerson, index }: Props) => {
  return (
    <SingleRow
      className="single-element"
      onClick={() => chosenPerson(singlePlayer)}
    >
      {index}. {singlePlayer.player_name} {singlePlayer.player_surname}
    </SingleRow>
  )
}
