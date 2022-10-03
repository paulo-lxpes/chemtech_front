import { Stack, Typography } from "@mui/material"
import { ReactComponent as EmptyBoxIcon } from '../../assets/imgs/icons/emptyBox.svg'

const NoRowsContent = () => {
  return (
    <Stack
      height="100%"
      alignItems="center" 
      justifyContent="center"
      style={{ padding: "5px" }}
    >
      <EmptyBoxIcon />
      <Typography>Nenhum conteúdo encontrado!</Typography>
    </Stack>
  )
}

export { NoRowsContent }