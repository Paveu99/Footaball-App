import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApi } from "../../hooks/useApi"
import { Team, TeamDto } from "../../../utils/types"

export const usePostTeamsMutation = () => {
  const { apiPost } = useApi()
  const queryClient = useQueryClient()

  const { mutate, data, error, isPending } = useMutation({
    mutationKey: ["teams"],
    mutationFn: async (payload: TeamDto) => {
      return apiPost<Team, TeamDto>(`teams`, payload)
    },
    onSuccess: (newTeam) => {
      queryClient.setQueryData<Team[]>(["teams"], (oldTeams) => {
        return [...(oldTeams || []), newTeam]
      })
    },
  })

  return {
    data,
    mutate,
    isPending,
    error,
  }
}
