import "../../../styles/SinglePlayer.scss"
import { Team } from "../../../utils/types"
import infoSign from "../../../styles/images/info.png"
import { SingleTeam } from "./SingleTeam"
import { useGetTeamsQuery } from "../../queries/teams/useGetTeamsQuery"

type Props = {
  setChosenTeam: (team: Team) => void
}

export const TeamsList = ({ setChosenTeam }: Props) => {
  const { data, error, isLoading } = useGetTeamsQuery()

  if (error)
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <img className="info-button" src={infoSign} />
        <p>Teams failed to fetch</p>
      </div>
    )
  if (isLoading) return <p>Loading teams</p>

  return (
    <div>
      <ol>
        {data?.map((el, index) => (
          <SingleTeam
            key={el.id}
            index={index + 1}
            singleTeam={el}
            chosenTeam={setChosenTeam}
          />
        ))}
      </ol>
    </div>
  )
}
