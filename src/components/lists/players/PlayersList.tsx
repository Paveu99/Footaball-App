import { useGetPlayersQuery } from "../../queries/players/useGetPlayersQuery"
import { SinglePlayer } from "./SinglePlayer"
import "../../../styles/SinglePlayer.scss"
import { Player } from "../../../utils/types"
import infoSign from "../../../styles/images/info.png"

type Props = {
  setChosenPlayer: (player: Player) => void
}

export const PlayersList = ({ setChosenPlayer }: Props) => {
  const { data, error, isLoading } = useGetPlayersQuery()

  if (error)
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <img className="info-button" src={infoSign} />
        <p>Players failed to fetch</p>
      </div>
    )
  if (isLoading) return <p>Loading players</p>

  return (
    <div>
      <ol>
        {data?.map((el, index) => (
          <SinglePlayer
            key={el.id}
            index={index + 1}
            singlePlayer={el}
            chosenPerson={setChosenPlayer}
          />
        ))}
      </ol>
    </div>
  )
}
