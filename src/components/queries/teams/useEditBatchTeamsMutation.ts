import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApi } from "../../hooks/useApi"
import { Team, TeamToEdit } from "../../../utils/types"

export const useBatchEditTeamsMutation = () => {
  const { apiPut } = useApi()
  const queryClient = useQueryClient()

  const { mutate, data, error, isPending, isSuccess } = useMutation({
    mutationKey: ["teams"],
    mutationFn: async (teams: TeamToEdit[]) => {
      const promises = teams.map((team) =>
        apiPut<Team, TeamToEdit>(`teams/${team.id}`, team),
      )
      return Promise.all(promises)
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
