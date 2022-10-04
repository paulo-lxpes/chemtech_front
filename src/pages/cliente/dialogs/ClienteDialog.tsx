import React, { useEffect, useState } from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, useTheme } from "@mui/material"
import { Formik, FormikHandlers, FormikState } from "formik"
import moment from "moment"
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

const ClienteDialog = ({ open, setOpenForm }: Props) => {
  const [label, setLabel] = useState<string>('Cadastrar')
  const { mutateAsync: createCliente } = usePostCliente()
  const { mutateAsync: updateCliente } = usePutCliente()
  const { id } = useParams()
  const navigate = useNavigate()
  const theme = useTheme()

  const initialValues: Cliente = {
    clI_COD: 0,
    nome: "",
    sexo: "",
    datA_NASCIMENTO: moment().toISOString(),
    idade: 0,
    ciD_COD: 0
  }

  const criarEEditarCliente = async (
    values: Cliente, 
    resetForm: (nextState?: Partial<FormikState<Cliente>> | undefined) => void
    ) => {
    try {
      const dataPost: Cliente = {
        clI_COD: id ? parseInt(id) : 0,
        nome: values.nome,
        sexo: values.sexo,
        datA_NASCIMENTO: values.datA_NASCIMENTO,
        idade: values.idade,
        ciD_COD: values.ciD_COD
      }

      if(id) {
        await updateCliente(dataPost)
      } else {
        await createCliente(dataPost)
        resetForm()
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

  const handleClose = (resetForm: FormikHandlers['handleReset']) => {
    setOpenForm(false)
    resetForm()
    navigate("/clientes")
  }

  useEffect(() => {
    if(id) {
      setLabel("Editar")
    } else {
      setLabel("Salvar")
    }
  }, [id])

  return (
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, { resetForm }) => await criarEEditarCliente(values, resetForm)}
          validationSchema={validationSchema}
          enableReinitialize={true}
        >
          {({
            handleSubmit,
            resetForm,
            handleReset
          }) => (
            <Dialog open={open} onClose={() => handleClose(handleReset)}>
              <DialogTitle>Criar novo Cliente</DialogTitle>
              <Divider />
              <DialogContent>
                <ClienteForm />
               <DialogActions sx={{ paddingY: 5 }}>
                  <Button variant="contained" type="reset" color="info" onClick={() => handleClose(handleReset)}>Voltar</Button>
                  <Button variant="contained" onClick={() => handleSubmit()}>{label}</Button>
               </DialogActions>
              </DialogContent>
            </Dialog>
          )}
        </Formik>
  )
}

export default ClienteDialog