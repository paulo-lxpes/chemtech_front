import React from 'react'
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useGetCiclos } from '../../hooks/ciclos/useCiclos'
import { MenuProps } from './utils'

interface IProps {
  ciclo?: number
  setCiclo?: React.Dispatch<React.SetStateAction<number>>
  notValueZero?: boolean
  helperText?: false | JSX.Element
  required?: boolean
}


const SelectCiclos = ({ ciclo, setCiclo, notValueZero, helperText, required }: IProps) => {
  const { data: listCiclos } = useGetCiclos()
  const handleChangeCiclo = (e: SelectChangeEvent<number>) => {
    setCiclo?.(e.target.value as number)
  }

  const selectItens = listCiclos?.map((filterCiclo, index) => (
    <MenuItem key={index} value={filterCiclo.ciC_COD}>
      {filterCiclo.ano}
    </MenuItem>
  ))

  return (
    <FormControl fullWidth required={required}>
      <Select
        fullWidth
        autoWidth
        variant='outlined'
        id="ciclos"
        name="ciclos"
        value={ciclo}
        onChange={handleChangeCiclo}
        MenuProps={MenuProps}
        size="small"
      >
        {!notValueZero && (
          <MenuItem value={0}>
            Todos
          </MenuItem>
        )}
        {selectItens}
      </Select>
      {helperText}
    </FormControl>
  )

}

export default SelectCiclos