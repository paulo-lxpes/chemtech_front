import React, { useState } from "react"
import {
  DataGrid,
  GridActionsCellItem,
  GridRowId,
  GridColumns,
} from '@mui/x-data-grid';
import { Box, Button } from "@mui/material";

const DataGridCargosVinculados = () => {
  const [rows, setRows] = useState([])
  const [rowId, setRowId] = useState<number>(0)

  function sleep(delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay)
    })
  }

  type Row = typeof rows[number]

  const columns = React.useMemo<GridColumns<Row>>(
    () => [
      { field: 'descricao', type: 'string', width: 250, flex: 2, headerAlign: 'center',renderHeader: () => <strong>Descrição</strong> },
      { field: 'tipoCargo', type: 'string',width: 250, flex: 2, headerAlign: 'center',renderHeader: () => <strong>Tipo de Cargo</strong> },
      { field: 'peso', type: 'number', width: 250, flex: 2, headerAlign: 'center',renderHeader: () => <strong>Peso</strong> },
      {
        field: 'actions',
        type: 'actions',
        width: 250,
        flex: 1,
        renderHeader: () => <strong>Ações</strong>,
        getActions: (params) => [
          <Button 
            size='small'
            variant='contained' 
            color="error" 
            /* onClick={deleteEtiqueta(params.id)} */>
            Deletar
          </Button>,
        ],
      },
    ],
    [],
  );

  return (
    <Box 
      sx={{
        position: 'relative',
        height: '100%',
        paddingY: 2
      }}>
      <DataGrid
        autoHeight 
        disableColumnMenu
        hideFooter
        columns={columns}
        rows={rows}
        /* getRowId={(row) => row?.etQ_COD} */
        hideFooterSelectedRowCount
        /* loading={!rows.length} */
      />
    </Box>
  )

}

export default DataGridCargosVinculados