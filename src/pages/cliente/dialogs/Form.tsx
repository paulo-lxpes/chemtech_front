/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react"
import { FormHelperText, Grid, TextField, MenuItem } from "@mui/material"
import { useFormikContext } from 'formik'
import { useParams } from "react-router-dom"
import Api from "../../../services/Api"
import { Cliente } from "../interfaces/ICliente"
import { useGetCidadesLista } from "../../../hooks/cidade/useCidade"
import { DatePicker } from "@mui/lab"
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import moment from "moment"


const listaSexo = [{ field: "Masculino", value: "M" }, { field: "Feminino", value: "F" }]

const ClienteForm = () => {
  const formik = useFormikContext<Cliente>()
  const { id } = useParams()
  const { data: listaCidades } = useGetCidadesLista()
  const idade = moment().diff(formik.values.datA_NASCIMENTO, 'years')

  useEffect(() => {
    if(id) {
      Api.get<Cliente[]>(`clientes?CLI_COD=${id}`).then((result) => {
        const { data: cliente } = result
        return formik.setValues(cliente[0])
      })

    }
  }, [id])

  useEffect(() => {
    if(formik.values.datA_NASCIMENTO) {
      formik.setFieldValue("idade", idade)
    }
  }, [formik.values.datA_NASCIMENTO])

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
      sx={{ margin: 0, color: 'red' }}
    >
      {formik.errors.idade}
    </FormHelperText>
  )

  const errorTextDataNascimento = formik.errors?.datA_NASCIMENTO && formik.touched.datA_NASCIMENTO && (
    <FormHelperText 
      sx={{ margin: 0, color: 'red' }}
    >
      {formik.errors.datA_NASCIMENTO}
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
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <FormHelperText sx={{ paddingY: '9px' }}>Cidade*</FormHelperText>
          <TextField
            select
            fullWidth
            size="small"
            id="ciD_COD"
            name="ciD_COD"
            value={formik.values?.ciD_COD}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.errors?.ciD_COD && formik?.touched.ciD_COD)}
            helperText={errorTextCidade}
            >
              <MenuItem value={0}>
                Selecione
              </MenuItem>
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
        <Grid item xs={4}>
          <FormHelperText sx={{ paddingY: '9px' }}>Data de nascimento*</FormHelperText>
          <DatePicker
            disableFuture
            mask="__/__/____"
            inputFormat="dd/MM/yyyy"
            value={formik.values.datA_NASCIMENTO}
            onChange={(value) => formik.setFieldValue('datA_NASCIMENTO', value)}
            renderInput={(params) => (
              <TextField 
                error={Boolean(formik.touched.datA_NASCIMENTO && formik.errors.datA_NASCIMENTO)}
                helperText={errorTextDataNascimento}
                name="datA_NASCIMENTO"
                fullWidth
                size="small"
                {...params} 
              />
            )}
          />
        </Grid>
        <Grid item xs={3}>
          <FormHelperText sx={{ paddingY: '9px' }}>Idade*</FormHelperText>
          <TextField
            disabled
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
            id="sexo"
            name="sexo"
            select
            SelectProps={{
              displayEmpty: true
            }}
            value={formik.values?.sexo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.errors?.sexo && formik.touched.sexo)}
            helperText={errorTextSexo}
            fullWidth
            size="small"
            >
              <MenuItem value="">
                Selecione
              </MenuItem>
              {listaSexo.map((sexo, index) => (
                <MenuItem key={index} value={sexo.value}>
                  {sexo.field}
                </MenuItem>
              ))}
            </TextField>
        </Grid>
      </Grid>
    </LocalizationProvider>
  )
}

export default ClienteForm