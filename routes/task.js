import express from 'express'

const router = express.Router()

import taskController from '../controller/task.js'

router
  .route('/')
  .get(taskController.getAllTasks)
  .post(taskController.createTask)

router
  .route('/:id')
  .get(taskController.getTask)
  .patch(taskController.updateTask)
  .delete(taskController.deleteTask)

export default router
