import React, { useState } from "react"
import {
  DataGrid,
  GridActionsCellItem,
  GridRowId,
  GridColumns,
} from '@mui/x-data-grid';
import { Box, Button } from "@mui/material";

const DataGridComportamentosChave = () => {
  const [rows, setRows] = useState([])
  const [rowId, setRowId] = useState<number>(0)
  
  type Row = typeof rows[number]

  const columns = React.useMemo<GridColumns<Row>>(
    () => [
      { field: 'ciclo', type: 'string', width: 250, flex: 2, headerAlign: 'center',renderHeader: () => <strong>Ciclo</strong> },
      { field: 'comportamentoChave', type: 'string',width: 250, flex: 2, headerAlign: 'center',renderHeader: () => <strong>Comportamento-chave</strong> },
      { field: 'nivelFamiliaCargo', type: 'number', width: 250, flex: 2, headerAlign: 'center',renderHeader: () => <strong>Nível Família de Cargo</strong> },
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
          <Button 
            size='small'
            variant='contained' 
            color="error" 
            /* onClick={deleteEtiqueta(params.id)} */>
              Editar
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
        paddingY: 5
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

export default DataGridComportamentosChave