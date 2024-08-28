import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApi } from "../../hooks/useApi"
import { Player, PlayerDto } from "../../../utils/types"

export const useBatchEditPlayersMutation = () => {
  const { apiPut } = useApi()
  const queryClient = useQueryClient()

  const { mutate, data, error, isPending, isSuccess } = useMutation({
    mutationKey: ["players"],
    mutationFn: async (players: Player[]) => {
      const promises = players.map((player) =>
        apiPut<Player, PlayerDto>(`players/${player.id}`, player),
      )
      return Promise.all(promises)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["players"],
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
