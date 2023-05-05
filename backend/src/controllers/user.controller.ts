import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';

import HttpStatus from '../commons/consts/httpStatus.enum';
import UserPrismaModel, { UserModel } from '../models/user.model';
import UserMapper from '../utils/user.mapper';
import { NotFoundError } from '../commons/errors/error';

const HASHING_COUNT = 12;

class UserController {
  private readonly userModel: UserModel;

  constructor() {
    this.userModel = new UserPrismaModel();
  }

  createUser: RequestHandler = async (req, res, _next) => {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, HASHING_COUNT);
    const user = await this.userModel.create({ ...req.body, password: hashedPassword });
    return res.status(HttpStatus['CREATED']).header('Location', `/api/users/${user.id}`).send();
  };

  getUsers: RequestHandler = async (_req, res, _next) => {
    const users = await this.userModel.findAll();
    const userDtos = users.map((user) => UserMapper.toUserDto(user));
    return res.status(HttpStatus['OK']).send(userDtos);
  };

  getUserDetail: RequestHandler = async (req, res, next) => {
    const id = parseInt(req.params['id']);
    const user = await this.userModel.findById(id);
    if (!user) {
      return next(new NotFoundError(`Not found user by id. (id: ${id})`));
    }
    const userDetailDto = UserMapper.toUserDetailDto(user);
    return res.status(HttpStatus['OK']).send(userDetailDto);
  };

  getUserTasks: RequestHandler = async (req, res, next) => {
    const id = parseInt(req.params['id']);
    const userTasks = await this.userModel.findUserTasksById(id);
    if (!userTasks) {
      return next(new NotFoundError(`Not found user tasks by id. (id: ${id})`));
    }
    const userTasksDto = UserMapper.toUserTasksDto(userTasks);
    return res.status(HttpStatus['OK']).send(userTasksDto);
  };

  updateUser: RequestHandler = async (req, res, _next) => {
    const id = parseInt(req.params['id']);
    await this.userModel.updateById(id, { ...req.body });
    return res.status(HttpStatus['NO_CONTENT']).send();
  };

  deleteUser: RequestHandler = async (req, res, _next) => {
    const id = parseInt(req.params['id']);
    await this.userModel.deleteById(id);
    return res.status(HttpStatus['NO_CONTENT']).send();
  };
}

export default UserController;
