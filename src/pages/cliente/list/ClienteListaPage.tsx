/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useMemo, useEffect, useCallback } from 'react'
import BoxContainer from "../../../components/box/BoxContainer"
import { Grid, Typography, Divider, FormHelperText, Button, Box, IconButton, TextField, MenuItem } from '@mui/material'
import { LinkBehavior } from '../../../components/link/Link'
import { DataGrid, GridColumns, GridRowId } from '@mui/x-data-grid'
import ClienteDialog from '../dialogs/ClienteDialog'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Cliente } from '../interfaces/ICliente'
import { useDeleteCliente, useGetClientesPorNome } from '../../../hooks/cliente/useCliente'
import { useTheme } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CustomMixinToast from '../../../components/CustomMixinToast/CustomMixinToast'
import Swal from 'sweetalert2'

const ClienteListaPage = () => {
  const [nome, setNome] = useState("")
  const [openForm, setOpenForm] = useState(false);
  const [rows, setRows] = useState<readonly Cliente[]>([])

  const { data: listaClientes, isSuccess: success, isLoading } = useGetClientesPorNome(nome)
  const {mutateAsync: deletarCliente} = useDeleteCliente()
  const navigate = useNavigate()
  const theme = useTheme()

  type Row = typeof rows[number]
  
  const handleClickOpen = () => {
    setOpenForm(true);
  }

  const handleOpenEditar = useCallback(
    (id: GridRowId) => () => {
      setTimeout(() => {
        navigate(`/clientes/editar/${id}`)
        setOpenForm(true)
      })
    }, []
  )

  const handleDeleteCliente = (id: number) => {
    Swal.fire({
      icon: 'warning',
      title: 'Dejesa excluir esse registro?',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      confirmButtonColor: theme.palette.primary.main,
      cancelButtonText: 'Não',
      cancelButtonColor: theme.palette.error.main,
      showLoaderOnConfirm: true,
      customClass: {
        container: 'my-swal'
      },
      preConfirm: async () => {
        return await deletarCliente(id)
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        CustomMixinToast.fire({
          title: 'Excluído!',
          text: 'O Registro foi excluído com sucesso',
          icon: 'success',
          confirmButtonColor: theme.palette.primary.main
        })
      }
    }).catch((err) => {
      CustomMixinToast.fire(
        'Erro!',
        'Erro ao excluir o registro.',
        'error'
      )
    })
  }

  const columns = useMemo<GridColumns<Row>>(
    () => [
      { field: 'clI_COD', type: 'number', hide: true },
      { field: 'nome', type: 'string', width: 200, flex: 2, headerAlign: 'center', align: 'center', renderHeader: () => <strong>Nome</strong> },
      { field: 'sexo', type: 'string',width: 250, flex: 2, headerAlign: 'center', align: 'center', renderHeader: () => <strong>Sexo</strong> },
      { field: 'datA_NASCIMENTO', type: 'string', width: 250, flex: 2, headerAlign: 'center', align: 'center', renderHeader: () => <strong>Dt. Nascimento</strong> },
      { field: 'idade', type: 'number', width: 250, flex: 2, headerAlign: 'center', align: 'center', renderHeader: () => <strong>Idade</strong> },
      { field: 'ciD_COD', type: 'number', width: 100, flex: 2, headerAlign: 'center', align: 'center', renderHeader: () => <strong>Cidade</strong> },
      {
        field: 'actions',
        type: 'actions',
        width: 250,
        flex: 2,
        renderHeader: () => <strong>Ações</strong>,
        getActions: (params) => [
          <IconButton
            aria-label="Editar Cliente"
            color="primary" 
            size='small'
            onClick={handleOpenEditar(params.id)} 
            >
            <EditRoundedIcon />
          </IconButton>,
          <IconButton
            aria-label="Excluir Cliente" 
            color="primary"
            size='small'
            onClick={() => handleDeleteCliente(params.id as number)} 
          >
            <DeleteRoundedIcon />
          </IconButton>,
        ],
      },
    ],
    [handleOpenEditar],
  )

  useEffect(() => {
    if (success) {
      setRows(listaClientes)
    }
  }, [listaClientes])

  const selectItens = listaClientes?.map((filterCliente, index) => (
    <MenuItem key={index} value={filterCliente.clI_COD}>
      {filterCliente.nome}
    </MenuItem>
  ))

  return (
    <BoxContainer>
      <Grid item xs={12} paddingBottom={5}>
        <Typography fontFamily="Montserrat" fontWeight={500} variant="h5" >
          Lista de Clientes
        </Typography>
        <Divider />
      </Grid>

      <Grid container>
          <Grid item xs={12}>
            <FormHelperText>Clientes</FormHelperText>
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="nome"
              name="nome"
              fullWidth
              select
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              size="small"
              SelectProps={{
                displayEmpty: true
              }}
            >
              <MenuItem value="">Selecione</MenuItem>
              {selectItens}
            </TextField>
          </Grid>
          <Grid item xs={9} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              variant="contained"
              component={LinkBehavior}
              href="/clientes/criar" 
              onClick={handleClickOpen}
              startIcon={<AddRoundedIcon />}>
                Criar
            </Button>
          </Grid>
          <Grid item xs={12}>
          <Box
            sx={{
              position: 'relative',
              height: '100%',
              paddingY: 5
            }}>
              <DataGrid
                autoHeight 
                disableColumnMenu
                columns={columns}
                rows={rows}
                getRowId={(row) => row?.clI_COD}
                loading={isLoading}
                hideFooterSelectedRowCount
              />
            </Box>
          </Grid>
        </Grid>

          <ClienteDialog open={openForm} setOpenForm={setOpenForm} />
    </BoxContainer>
  )
}

export default ClienteListaPage