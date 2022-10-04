import { IRoutes } from "../@types/contexts/router";
import ClienteListaPage from "../pages/cliente/list/ClienteListaPage";

const routes: IRoutes[] = [
  {
    path: '/clientes',
    name: 'Clientes',
    private: true,
    element: ClienteListaPage,
    default: true,
  },
  {
    path: '/clientes/criar',
    name: 'Clientes',
    private: true,
    element: ClienteListaPage,
    default: true,
  },
  {
    path: '/clientes/editar/:id',
    name: 'Clientes',
    private: true,
    element: ClienteListaPage,
    default: true,
  }
]

export default routes