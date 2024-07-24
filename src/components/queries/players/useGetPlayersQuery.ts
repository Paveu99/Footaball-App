import { useQuery } from "@tanstack/react-query"
import { useApi } from "../../hooks/useApi"
import { Player } from "../../../utils/types"

export const useGetPlayersQuery = () => {
  const { apiGet } = useApi()
  const { data, refetch, error, isLoading } = useQuery({
    queryKey: ["players"],
    queryFn: async () => {
      return apiGet<Player[]>("players")
    },
  })

  return {
    data,
    refetch,
    error,
    isLoading,
  }
}
