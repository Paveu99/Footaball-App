import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApi } from "../../hooks/useApi"
import { Player, PlayerDto } from "../../../utils/types"

export const useEditPlayersMutation = () => {
  const { apiPut } = useApi()
  const queryClient = useQueryClient()

  const { mutate, data, error, isPending, isSuccess } = useMutation({
    mutationKey: ["players"],
    mutationFn: async (payload: Player) => {
      return apiPut<Player, PlayerDto>(`players/${payload.id}`, payload)
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
