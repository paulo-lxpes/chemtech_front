import Api from "../../services/Api"
import { useQuery, UseQueryResult, UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query"

interface Cliente {
  clI_COD: number
  nome: string
  sexo: string
  datA_NASCIMENTO: string,
  idade: number
  ciD_COD: number
}

const getClientes = async (cli_cod?: string) => {
  const { data } = await Api.get<Cliente[]>(`cidades?CID_COD=${cli_cod ? cli_cod : 0}`)
  return data
}

const getClientesPorNome = async (nome: string) => {
  const { data } = await Api.get<Cliente[]>(`clientesPorNome?NOME=${nome}`)
  return data
}

const postCliente = async (cliente: Cliente ) => {
  const { data } = await Api.post(`clientesInstert`, {
    nome: cliente.nome,
    sexo: cliente.sexo,
    datA_NASCIMENTO: cliente.datA_NASCIMENTO,
    idade: cliente.idade,
    ciD_COD: cliente.ciD_COD
  })
  return data
}

const putCliente = async (cliente: Cliente) => {
  const { data } = await Api.put(`clientesUpdate`, cliente)
  return data
}

const deleteCliente = async (cli_cod: number) => {
  return await Api.delete(`clientesDelete?CLI_COD=${cli_cod}`)
}

const useGetClientesLista = (): UseQueryResult<Cliente[], Error> => {
  return useQuery(
    ['lista-clientes'], async () => await getClientes()
  )
}

const useFiltroCliente = (cli_cod?: string): UseQueryResult<Cliente[], Error> => {
  return useQuery(
    ['cliente', cli_cod], async () => await getClientes(cli_cod)
  )
}

const useGetClientesPorNome = (nome: string): UseQueryResult<Cliente[], Error> => {
  return useQuery(
    ['lista-clientes', nome], async () => await getClientesPorNome(nome)
  )
}

const usePostCliente = (): UseMutationResult<Cliente, unknown, Cliente, unknown> => {
  const queryClient = useQueryClient()
  return useMutation(async (cliente: Cliente) => await postCliente(cliente), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['lista-clientes'])
      return data
    }
  })
}

const usePutCliente = (): UseMutationResult<Cliente, unknown, Cliente, unknown> => {
const queryClient = useQueryClient()
  return useMutation(async (cliente: Cliente) => await putCliente(cliente), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['lista-clientes'])
      return data
    }
  })
}

const useDeleteCliente = (): UseMutationResult<any, unknown, number, unknown> => {
const queryClient = useQueryClient()
  return useMutation(async (cli_cod: number) => await deleteCliente(cli_cod), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(['lista-clientes'])
      return data
    }
  })
}

export { useGetClientesLista, useGetClientesPorNome, useFiltroCliente, usePostCliente, usePutCliente, useDeleteCliente }