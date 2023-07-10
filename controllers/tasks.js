const Task = require('../models/TasksModel')
const asyncWrapper = require("../middleware/async")
const { createCustomError } = require("../errors/custom-error")


const getAllTasks = asyncWrapper(async (req, res) => {
    const allTasks = await Task.find({});
    return res.status(200).json({ task: allTasks });
})

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task });
})


const getTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params
    const task = await Task.findOne({ _id: taskID })
    if (!task) {
        return next(createCustomError(`No task with id : ${taskID}`, 404))
        // return res.status(404).json({ msg: `No task with id : ${taskID}` })
    }
    return res.status(200).json({ task })
}
)

const deleteTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
        return next(createCustomError(`No task with id : ${taskID}`, 404))
        // return res.status(404).json({ msg: `No task with id ${task}` })
    }
    res.status(200).json({ task })
})

const updateTask = asyncWrapper( async (req, res, next) => {
        const { id: taskID } = req.params
        const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
            new: true,
            // returnOriginal: false,
            runValidators: true,
            // rawResult: true
        })
        if (!task) {
            return next(createCustomError(`No task with id : ${taskID}`, 404))
            // return res.status(404).json({ msg: `No task with id:${taskID}` })
        }
        res.status(200).json({ id: taskID, data: task });
    }
)


module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}