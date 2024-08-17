import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApi } from "../../hooks/useApi"
import { Team, TeamDto } from "../../../utils/types"

export const useEditTeamsMutation = () => {
  const { apiPut } = useApi()
  const queryClient = useQueryClient()

  const { mutate, data, error, isPending, isSuccess } = useMutation({
    mutationKey: ["teams"],
    mutationFn: async (payload: Team) => {
      return apiPut<Team, TeamDto>(`teams/${payload.id}`, payload)
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
