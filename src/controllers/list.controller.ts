import Unauthorized from '../exceptions/unauthorized.exception'
import { CustomRequest } from '../interfaces/custom_request.interface'
import { CustomResponse } from '../interfaces/custom_response.interface'
import ListService from '../services/list.service'

const listService = new ListService()

class ListController {
  public static async list(req: CustomRequest, res: CustomResponse) {
    try {
      const myList = req.loggedUser?.list

      res.json(myList)
    } catch (e) {
      console.log(`Erro trazer a lista! Dados: ${JSON.stringify(req.loggedUser)}`);

      res.errorHandler && res.errorHandler(e);
    }
  }

  public static async add(req: CustomRequest, res: CustomResponse) {
    const { body: { showId }, loggedUser } = req;

    try {
      if (!loggedUser) {
        throw new Unauthorized('Token necessário')
      }

      const added = await listService.add(showId, loggedUser)

      res.json(added)
    } catch (e) {
      console.log(`Erro ao salvar na lista! Dados: ${JSON.stringify(req.loggedUser)}`);

      res.errorHandler && res.errorHandler(e);
    }
  }

  public static async remove(req: CustomRequest, res: CustomResponse) {
    const { params: { showId }, loggedUser } = req;

    try {
      if (!loggedUser) {
        throw new Unauthorized('Token necesário')
      }

      const removed = await listService.remove(+showId, loggedUser)

      res.json(removed)
    } catch (e) {
      console.log(`Erro ao remove da lista! Dados: ${JSON.stringify(req.loggedUser)}`);

      res.errorHandler && res.errorHandler(e);
    }
  }
}

export default ListController;
