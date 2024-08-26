import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApi } from "../../hooks/useApi"
import { Player, PlayerDto } from "../../../utils/types"

export const usePostPlayersMutation = () => {
  const { apiPost } = useApi()
  const queryClient = useQueryClient()

  const { mutate, data, error, isPending, isSuccess } = useMutation({
    mutationKey: ["players"],
    mutationFn: async (payload: PlayerDto) => {
      return apiPost<Player, PlayerDto>(`players`, payload)
    },
    onSuccess: (createPlayer) => {
      queryClient.setQueryData<Player[]>(["players"], (oldPlayers) => {
        return [...(oldPlayers || []), createPlayer]
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
