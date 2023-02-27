import Task from '../model/task.js'
import { CustomError } from '../errors/CustomError.js'
import { StatusCodes } from 'http-status-codes'

const createTask = async (req, res) => {
  const task = await Task.create({ ...req.body, user: req.user.userId })
  const { title } = task
  if (!title) {
    throw CustomError.badRequest('plesae provide title')
  }
  res.status(StatusCodes.CREATED).json({
    msg: 'task created',
    data: task,
  })
}

const getAllTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.userId })
  res.status(StatusCodes.OK).json({
    msg: 'success',
    data: tasks,
  })
}

const getTask = async (req, res) => {
  const { id } = req.params
  const task = await Task.findOne({ _id: id, user: req.user.userId })
  res.status(StatusCodes.OK).json({
    msg: 'success',
    data: task,
  })
}

const deleteTask = async (req, res) => {
  const task = await Task.findOneAndDelete({
    _id: req.params.id,
    user: req.user.userId,
  })
  res.status(StatusCodes.OK).json({
    msg: 'task Deleted',
  })
}

const updateTask = async (req, res) => {
  const { title, completed } = req.body

  if (!title || !completed) {
    throw CustomError.badRequest('please provide title and completed')
  }

  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user.userId },
    req.body,
    {
      new: true,
      runValidators: true,
    },
  )
  if (!task) {
    throw CustomError.notFound('task not found')
  }
  res.status(StatusCodes.OK).json({
    msg: 'task Updated',
    data: task,
  })
}

export default {
  getAllTasks,
  getTask,
  deleteTask,
  updateTask,
  createTask,
}
