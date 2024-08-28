import { useEffect, useState } from "react"
import { useGetGamesQuery } from "../../components/queries/games/useGetGamesQuery"
import { Game } from "../../utils/types"
import { useGetTeamsQuery } from "../../components/queries/teams/useGetTeamsQuery"

export const LatestGame = () => {
  const { data, error, isLoading } = useGetGamesQuery()
  const [lastGame, setLastGame] = useState<Game | undefined>(undefined)
  const { data: teamsData } = useGetTeamsQuery()

  useEffect(() => {
    if (data && data.length > 0) {
      const sortedGames = data.sort((a, b) => {
        return new Date(b.game_date).getTime() - new Date(a.game_date).getTime()
      })
      setLastGame(sortedGames[0])
    }
  }, [data])

  if (isLoading) return <p>Loading last game...</p>
  if (error) return <p>Couldn't fetch latest game</p>
  if (!lastGame) return <p>No games available</p>

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "gray",
        margin: "10px",
        gap: "10px",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
        borderRadius: "8px",
      }}
    >
      <div style={{ alignSelf: "self-start", fontSize: "18px" }}>
        {lastGame.game_name}
      </div>
      <div style={{ fontSize: "24px", fontWeight: "bold" }}>
        {lastGame.game_time}'
      </div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          fontSize: "20px",
          justifyContent: "center",
          width: "100%",
          textAlign: "center",
        }}
      >
        <div style={{ flex: 1, textAlign: "right" }}>
          {teamsData?.find((el) => el.id === lastGame.team_a)?.team_name}
        </div>
        <div style={{ padding: "0 10px" }}>
          {lastGame.team_a_goals} - {lastGame.team_b_goals}
        </div>
        <div style={{ flex: 1, textAlign: "left" }}>
          {teamsData?.find((el) => el.id === lastGame.team_b)?.team_name}
        </div>
      </div>
      <small>
        {new Date(lastGame.game_date).toLocaleDateString()},{" "}
        {lastGame.game_place}
      </small>
    </div>
  )
}
