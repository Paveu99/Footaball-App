import { useQuery } from "@tanstack/react-query"
import { useApi } from "../../hooks/useApi"
import { Team } from "../../../utils/types"

export const useGetTeamsQuery = () => {
  const { apiGet } = useApi()
  const { data, refetch, error, isLoading } = useQuery({
    queryKey: ["teams"],
    queryFn: async () => {
      return apiGet<Team[]>("teams")
    },
  })

  return {
    data,
    refetch,
    error,
    isLoading,
  }
}
