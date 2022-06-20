import { Request } from 'express'
import { UserEntity } from '../entities'
import { CustomResponse } from '../interfaces/custom_response.interface'
import { IToken } from '../interfaces/user.interface'
import UserService from '../services/user.service'

const userService = new UserService()

class UserController {
  public static async create(req: Request, res: CustomResponse) {
    try {
    const result: UserEntity = await userService.create(req.body)

    res.status(201).json({ id: result.id, email: result.email })
  } catch (e: any) {
    res.errorHandler && res.errorHandler(e)
  }
  }

  public static async login(req: Request, res: CustomResponse) {
    try {
    const result: IToken = await userService.login(req.body)

    res.status(200).json(result)
  } catch (e: any) {
    res.errorHandler && res.errorHandler(e)
  }
  }
}

export default UserController
