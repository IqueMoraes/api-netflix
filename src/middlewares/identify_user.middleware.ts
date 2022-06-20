import { NextFunction } from 'express'
import jsonwebtoken from 'jsonwebtoken'
import { AppDataSource } from '../../configs/database/data-source'
import { CustomRequest } from '../interfaces/custom_request.interface'
import { CustomResponse } from '../interfaces/custom_response.interface'
import Unauthorized from '../exceptions/unauthorized.exception'
import { UserEntity } from '../entities'

const identifyUser = async (req: CustomRequest, res: CustomResponse, next: NextFunction) => {
  const token = req.headers.authorization?.replace('Bearer ', '')

  if (!token) {
    throw new Unauthorized('Token é necessário')
  }

  const userRepository = AppDataSource.getRepository(UserEntity)
  const secret = process.env.SECRET_KEY || ''
  const payload = await jsonwebtoken.verify(token, secret)

  if (!payload.sub) {
    throw new Unauthorized('Id inválido')
  }

  const loggedUser = await userRepository.findOne({ where: { id: +payload.sub } })

  if (!loggedUser) {
    throw new Unauthorized('Usuário não encontrado')
  }

  req.loggedUser = loggedUser

  return next()
}

export default identifyUser
