import { useGetTeamsQuery } from "../../components/queries/teams/useGetTeamsQuery"
import infoSign from "../../styles/images/info.png"

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
      <ol>
        {data
          ?.sort((a, b) => b.total_goals - a.total_goals)
          .slice(0, 3)
          .map((el, index) => (
            <li key={index}>
              {el.team_name} {el.total_goals}
            </li>
          ))}
      </ol>
    </div>
  )
}
