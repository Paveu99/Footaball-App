import "../../../styles/SinglePlayer.scss"
import { Game } from "../../../utils/types"
import infoSign from "../../../styles/images/info.png"
import { SingleGame } from "./SingleGame"
import { useGetGamesQuery } from "../../queries/games/useGetGamesQuery"

type Props = {
  setChosenGame: (game: Game) => void
}

export const GamesList = ({ setChosenGame }: Props) => {
  const { data, error, isLoading } = useGetGamesQuery()

  if (error)
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <img className="info-button" src={infoSign} />
        <p>Games failed to fetch</p>
      </div>
    )
  if (isLoading) return <p>Loading games</p>

  return (
    <div>
      <ol>
        {data?.map((el, index) => (
          <SingleGame
            key={el.id}
            index={index + 1}
            singleGame={el}
            chosenGame={setChosenGame}
          />
        ))}
      </ol>
    </div>
  )
}
