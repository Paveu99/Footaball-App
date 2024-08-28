import { useQuery } from "@tanstack/react-query"
import { useApi } from "../../hooks/useApi"
import { Player } from "../../../utils/types"

export const useGetPlayersFromTeamQuery = (teamId: string) => {
  const { apiGet } = useApi()
  const { data, refetch, error, isLoading } = useQuery({
    queryKey: ["players", teamId],
    queryFn: async () => {
      return apiGet<Player[]>(`players?teamId=${teamId}`)
    },
  })

  return {
    data,
    refetch,
    error,
    isLoading,
  }
}
