import { useQuery } from "@tanstack/react-query"
import { useApi } from "../../hooks/useApi"
import { Game } from "../../../utils/types"

export const useGetGamesOfCertainTeamQuery = (teamId: string) => {
  const { apiGet } = useApi()

  const fetchGames = async () => {
    const teamAGames = await apiGet<Game[]>(`games?team_a=${teamId}`)
    const teamBGames = await apiGet<Game[]>(`games?team_b=${teamId}`)

    return [...teamAGames, ...teamBGames]
  }

  const { data, refetch, error, isLoading } = useQuery({
    queryKey: ["games", teamId],
    queryFn: fetchGames,
  })

  return {
    data,
    refetch,
    error,
    isLoading,
  }
}
