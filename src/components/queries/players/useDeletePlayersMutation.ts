import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApi } from "../../hooks/useApi"
import { Player } from "../../../utils/types"

export const useDeletePlayersMutation = () => {
  const { apiDelete } = useApi()
  const queryClient = useQueryClient()

  const { mutate, data, error, isPending } = useMutation({
    mutationKey: ["players"],
    mutationFn: async () => {
      return apiDelete<Player>(`players`)
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
  }
}
