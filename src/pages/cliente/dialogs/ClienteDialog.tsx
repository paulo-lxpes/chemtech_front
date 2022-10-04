import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Stack, useTheme } from "@mui/material"
import { Formik, useFormikContext } from "formik"
import moment from "moment"
import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"
import { Cliente } from "../interfaces/ICliente"
import ClienteForm from "./Form"
import * as yup from 'yup'
import { usePostCliente, usePutCliente } from "../../../hooks/cliente/useCliente"

interface Props {
  open: boolean
  setOpenForm: React.Dispatch<React.SetStateAction<boolean>>
}

const validationSchema = yup.object().shape({ 
  clI_COD: yup.number(),
  nome: yup.string().required("Digite o nome do cliente"),
  sexo: yup.string().required("Escolha o sexo"),
  datA_NASCIMENTO: yup.string().required("escolha a data de nascimento"),
  idade: yup.number().integer().min(1, "Não pode ser 0").required("Adicione sua idade").max(200, "idade inválida"),
  ciD_COD: yup.number().integer().min(1, "Escolha uma cidade").required("Escolha uma cidade")
})

const ClienteDialog = forwardRef<any, Props>(({ open, setOpenForm }, ref) => {
  const [label, setLabel] = useState<string>('Cadastrar')
  const { mutateAsync: createCliente } = usePostCliente()
  const { mutateAsync: updateCliente } = usePutCliente()
  const { id } = useParams()
  const navigate = useNavigate()
  const formik = useFormikContext<Cliente>()
  const theme = useTheme()

  const initialValues: Cliente = {
    clI_COD: 0,
    nome: "",
    sexo: 0,
    datA_NASCIMENTO: moment().toISOString(),
    idade: 0,
    ciD_COD: 0
  }

  const criarEEditarCliente = async () => {
    try {
      const dataPost: Cliente = {
        clI_COD: id ? parseInt(id) : 0,
        nome: "",
        sexo: 0,
        datA_NASCIMENTO: moment().toISOString(),
        idade: 0,
        ciD_COD: 0
      }

      if(id) {
        await updateCliente(dataPost)
      } else {
        await createCliente(dataPost)
        formik.resetForm()
      }

      Swal.fire({
        title: 'Sucesso!',
        text: `Sucesso ao ${label} o cliente`,
        icon: 'success',
        confirmButtonColor: theme.palette.primary.main,
        customClass: {
          container: 'my-swal'
        }
      })
    }
    catch {
      Swal.fire({
        title: 'Erro!',
        text: `Erro ao ${label} o cliente`,
        icon: 'error',
        customClass: {
          container: 'my-swal'
        }
      })
    }
  }

  useImperativeHandle(ref, ()=> ({
    criarEEditarCliente,
    initialValues
  }))

  
  const handleClose = () => {
    setOpenForm(false)
    formik.resetForm()
    navigate("/cidades")
  }

  useEffect(() => {
    if(id) {
      setLabel("Editar")
    } else {
      setLabel("Salvar")
    }
  }, [id])

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Criar novo Cliente</DialogTitle>
      <Divider />
      <DialogContent>
        <Formik
            initialValues={initialValues}
            onSubmit={async () => await criarEEditarCliente()}
            validationSchema={validationSchema}
            enableReinitialize={true}
          >
          <ClienteForm />
        </Formik>
        <DialogActions sx={{ paddingY: 5 }}>
          <Button variant="contained" type="reset" color="info" onClick={handleClose}>Voltar</Button>
          <Button variant="contained" onClick={() => formik.handleSubmit()}>{label}</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  )
})

export default ClienteDialog