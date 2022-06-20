import { Repository } from 'typeorm'
import { hashSync, compareSync } from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { AppDataSource } from '../../configs/database/data-source'
import { UserEntity } from '../entities'
import NotFoundException from '../exceptions/not_found.exception'
import { Ilogin } from '../interfaces/user.interface'
import Unauthorized from '../exceptions/unauthorized.exception'
import BadRequest from '../exceptions/bad_request.exception'

dotenv.config()

class UserService {
  userRepository: Repository<UserEntity>

  constructor() {
    this.userRepository = AppDataSource.getRepository(UserEntity)
  }

  /**
   * Retorna todos os users
   *
   * @returns Lista de todos os users
   *
   * */
  list() {
    return this.userRepository.find()
  }

  /**
   * Retorna o user baseado no id
   *
   * @params um id em formato número
   *
   * @returns Um user ou undefined
   *
   * */
   listOne(id: number) {
    return this.userRepository.findOne({ where: { id } })
  }

  /**
   * Retorna o user baseado no email
   *
   * @params um email em formato string
   *
   * @returns Um user ou undefined
   *
   * */
   async getByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } })
  }

  /**
   * Insere um novo usuário no banco de dados
   *
   * @returns Um objeto com email do usário e o id gerado
   */
  async create(user: Omit<UserEntity, 'id'>) {
    const emailAlreadyExists = await this.getByEmail(user.email)

    if (emailAlreadyExists) {
      throw new BadRequest('Usuário já cadastrado na base de dados')
    }
    const newUser = await this.userRepository.create({ email: user.email, password: hashSync(user.password, 10) })
    return await this.userRepository.save(newUser)
  }

  /**
   * Deleta o user identificado pelo id
   *
   * @returns o user deletado
   *
   * @params um id em formato número
   */
   async delete(id: number) {
    const user = await this.userRepository.delete(id);

    if (user.affected) {
      return user;
    }

    throw new NotFoundException(`O user id: ${id} não foi encontrado`);
  }

   /**
   * Realiza autenticação do usuário no banco de dados
   *
   * @param {email: string, password: string} login objeto da requisição
   *
   * @returns Um token de autenticação
   *
   *
   */
    async login(loginData: Ilogin) {
      const user = await this.getByEmail(loginData.email)

      if (!user) {
        throw new Unauthorized('E-mail e/ou senha inválidos');
      }

      const validPassword = compareSync(loginData.password, user.password)

      if (!validPassword) throw new Unauthorized('E-mail e/ou senha inválidos');

      const token = jwt.sign({
        sub: user.id,
        email: user.email,
        iat: Date.now()
      }, process.env.SECRET_KEY ?? 'senha')

      return { token }
    }
}

export default UserService
