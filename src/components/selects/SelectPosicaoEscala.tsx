import React from 'react'
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { MenuProps } from './utils'
import { useGetEscalasLista } from '../../hooks/escala/useEscala'
import { useGetItensDeDominio } from '../../hooks/dominio/useDominio'
import { FormikHandlers } from 'formik'

interface IProps {
  id: string
  name: string
  value: number
  handleChange: FormikHandlers['handleChange']
  handleBlur: FormikHandlers['handleBlur']
  error: boolean
  helperText: false | "" | JSX.Element | undefined
}


const SelectPosicaoEscala = ({ id, name, value, handleChange, handleBlur, error, helperText }: Partial<IProps>) => {
  const { data: listaPosicao } = useGetItensDeDominio("POSICAOESCALA")

  const selectItens = listaPosicao?.map((posicaoFiltered, index) => (
    <MenuItem key={index} value={posicaoFiltered.codigo}>
      {posicaoFiltered.descricao}
    </MenuItem>
  ))

  return (
    <FormControl fullWidth>
      <Select
        fullWidth
        size="small"
        variant='outlined'
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        MenuProps={MenuProps}
        error={error}
        >
          <MenuItem value={0}>
            Selecione
          </MenuItem>
          {selectItens}
      </Select>
      {helperText}
    </FormControl>
  )

}

export default SelectPosicaoEscala