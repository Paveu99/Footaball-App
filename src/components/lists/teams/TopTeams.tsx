import { useGetTeamsQuery } from "../../queries/teams/useGetTeamsQuery"
import infoSign from "../../../styles/images/info.png"
import { TopTeam } from "./TopTeam"

export const TopTeams = () => {
  const { data, error, isLoading } = useGetTeamsQuery()

  if (error)
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <img className="info-button" src={infoSign} />
        <p>Teams failed to fetch</p>
      </div>
    )

  if (isLoading) return <p>Loading top teams...</p>
  if (error) return <p>Teams couldn't be fetched</p>

  return (
    <div>
      <ol
        style={{
          backgroundColor: "grey",
          height: "121.667px",
          margin: "10px",
          borderRadius: "10px",
          paddingTop: "14px",
        }}
      >
        {data
          ?.sort((a, b) => b.total_goals - a.total_goals)
          .slice(0, 3)
          .map((el, index) => (
            <TopTeam key={el.id} index={index + 1} singleTeam={el} />
          ))}
      </ol>
    </div>
  )
}
