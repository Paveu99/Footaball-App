import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApi } from "../../hooks/useApi"
import { Player } from "../../../utils/types"

export const useDeletePlayersMutation = () => {
  const { apiDelete } = useApi()
  const queryClient = useQueryClient()

  const { mutate, data, error, isPending, isSuccess } = useMutation({
    mutationKey: ["players"],
    mutationFn: async (playerId: string) => {
      return apiDelete<Player>(`players/${playerId}`)
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
