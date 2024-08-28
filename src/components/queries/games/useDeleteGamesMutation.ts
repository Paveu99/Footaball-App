import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApi } from "../../hooks/useApi"
import { Game } from "../../../utils/types"

export const useDeleteGamesMutation = () => {
  const { apiDelete } = useApi()
  const queryClient = useQueryClient()

  const { mutate, data, error, isPending, isSuccess } = useMutation({
    mutationKey: ["games"],
    mutationFn: async (gameId: string) => {
      return apiDelete<Game>(`games/${gameId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["games"],
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
