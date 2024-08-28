import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApi } from "../../hooks/useApi"
import { Game, GameDto } from "../../../utils/types"

export const usePostGamesMutation = () => {
  const { apiPost } = useApi()
  const queryClient = useQueryClient()

  const { mutate, data, error, isPending, isSuccess } = useMutation({
    mutationKey: ["games"],
    mutationFn: async (payload: GameDto) => {
      return apiPost<Game, GameDto>(`games`, payload)
    },
    onSuccess: (newGame) => {
      queryClient.setQueryData<Game[]>(["games"], (oldGames) => {
        return [...(oldGames || []), newGame]
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
