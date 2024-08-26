import { useQuery } from "@tanstack/react-query"
import { useApi } from "../../hooks/useApi"
import { Game } from "../../../utils/types"

export const useGetGamesQuery = () => {
  const { apiGet } = useApi()
  const { data, refetch, error, isLoading } = useQuery({
    queryKey: ["games"],
    queryFn: async () => {
      return apiGet<Game[]>("games")
    },
  })

  return {
    data,
    refetch,
    error,
    isLoading,
  }
}
