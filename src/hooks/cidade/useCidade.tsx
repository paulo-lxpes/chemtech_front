import Api from "../../services/Api"
import { useQuery, UseQueryResult, UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"

interface Cidade {
  ciD_COD: number
  nome: string
  estado: string
}

const getCidades = async (cid_cod?: string) => {
  const { data } = await Api.get<Cidade[]>(`cidades?CID_COD=${cid_cod ? cid_cod : 0}`)
  return data
}

const useGetCidadesLista = (): UseQueryResult<Cidade[], Error> => {
  return useQuery(
    ['lista-cidades'], async () => await getCidades()
  )
}

export { useGetCidadesLista }