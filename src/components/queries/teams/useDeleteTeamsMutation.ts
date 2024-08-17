import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApi } from "../../hooks/useApi"
import { Team } from "../../../utils/types"

export const useDeleteTeamsMutation = () => {
  const { apiDelete } = useApi()
  const queryClient = useQueryClient()

  const { mutate, data, error, isPending, isSuccess } = useMutation({
    mutationKey: ["teams"],
    mutationFn: async (teamId: string) => {
      return apiDelete<Team>(`teams/${teamId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["teams"],
      })
    },
  })

  return {
    data,
    mutate,
    isPending,
    error,
    isSuccess,
  }
}
