import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApi } from "../../hooks/useApi"
import { Game, GameDto } from "../../../utils/types"

export const useEditGamesMutation = () => {
  const { apiPut } = useApi()
  const queryClient = useQueryClient()

  const { mutate, data, error, isPending, isSuccess } = useMutation({
    mutationKey: ["games"],
    mutationFn: async (payload: Game) => {
      return apiPut<Game, GameDto>(`games/${payload.id}`, payload)
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
