import React, { useContext, useEffect, useState } from "react"
import { FormHelperText, Grid, TextField, MenuItem } from "@mui/material"
import { useFormikContext } from 'formik'
import { useParams } from "react-router-dom"
import Api from "../../../services/Api"
import { red } from "@mui/material/colors"
import { Cliente } from "../interfaces/ICliente"
import { useGetCidadesLista } from "../../../hooks/cidade/useCidade"


const ClienteForm = () => {
  const formik = useFormikContext<Cliente>()
  const { id } = useParams()
  const { data: listaCidades } = useGetCidadesLista()

  useEffect(() => {
    if(id) {
      Api.get<Cliente[]>(`clientes?CLI_COD=${id}`).then((result) => {
        const { data: cliente } = result
        return formik.setValues(cliente[0])
      })

    }
  }, [id])

  const errorTextCidade = formik.errors?.ciD_COD && formik.touched.ciD_COD && (
      <FormHelperText 
        sx={{ margin: 0, color: 'red' }}
      >
        {formik.errors.ciD_COD}
      </FormHelperText>
    )

  const errorTextNome = formik.errors?.nome && formik.touched.nome && (
    <FormHelperText 
      sx={{ margin: 0, color: 'red' }}
    >
      {formik.errors.nome}
    </FormHelperText>
  )

  const errorTextIdade = formik.errors?.idade && formik.touched.idade && (
    <FormHelperText 
      sx={{ color: 'red' }}
    >
      {formik.errors.idade}
    </FormHelperText>
  )

  const errorTextSexo = formik.errors?.sexo && formik.touched.sexo && (
    <FormHelperText 
      sx={{ margin: 0, color: 'red' }}
    >
      {formik.errors.sexo}
    </FormHelperText>
  )
  const selectItens = listaCidades?.map((filterCiclo, index) => (
    <MenuItem key={index} value={filterCiclo.ciD_COD}>
      {filterCiclo.nome}
    </MenuItem>
  ))

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <FormHelperText sx={{ paddingY: '9px' }}>Cidade*</FormHelperText>
        <TextField
            select
            fullWidth
            size="small"
            id="ciD_COD"
            name="ciD_COD"
            variant='outlined'
            value={formik.values.ciD_COD}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.errors?.ciD_COD && formik?.touched.ciD_COD)}
            helperText={errorTextCidade}
          >
            {selectItens}
          </TextField>
      </Grid>
      <Grid item xs={12}>
        <FormHelperText sx={{ paddingY: '9px' }}>Nome*</FormHelperText>
        <TextField 
          fullWidth
          size="small"
          id="nome"
          name="nome"
          value={formik.values.nome}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Digite o nome do cliente"
          error={Boolean(formik.errors?.nome && formik.touched?.nome)}
          helperText={errorTextNome}
          />
      </Grid>
      <Grid item xs={3}>
        <FormHelperText sx={{ paddingY: '9px' }}>Idade*</FormHelperText>
        <TextField
          fullWidth
          size="small"
          type="number" 
          id="idade"
          name="idade"
          value={formik.values.idade}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          InputProps={{
            inputProps: {
              min: 1
            }
          }}
          error={Boolean(formik.errors?.idade && formik.touched?.idade)}
          helperText={errorTextIdade}
          />
      </Grid>
      <Grid item xs={3}>
        <FormHelperText sx={{ paddingY: '9px' }}>Sexo*</FormHelperText>
        <TextField
          fullWidth
          size="small"
          type="number" 
          id="sexo"
          name="sexo"
          value={formik.values.sexo}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.errors?.sexo && formik.touched?.sexo)}
          helperText={errorTextSexo}
          />
      </Grid>
    </Grid>
  )
}

export default ClienteForm