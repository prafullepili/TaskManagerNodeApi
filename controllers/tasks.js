const Task = require('../models/TasksModel')

const getAllTasks = async (req, res) => {
    try {
        const allTasks = await Task.find({});
        return res.status(200).json({ task: allTasks });
    } catch (error) {
        return res.status(500).json(error)
    }
}

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        console.log(task);
        res.status(201).json({ task });
    } catch (error) {
        res.status(500).json(error)
    }
}


const getTask = async (req, res) => {
    try {
        const { id: taskID } = req.params
        const task = await Task.findOne({ _id: taskID })
        if (!task) {
            return res.status(404).json({ msg: `No task with id : ${taskID}` })
        }
        return res.status(200).json({ task })
    } catch (error) {
        res.status(500).json(error)
    }
    res.send('get single task');
}


const updateTask = (req, res) => {
    res.send('update task');
}
const deleteTask = async (req, res) => {
    try {
        const { id: taskID } = req.params
        const task = await Task.findOneAndDelete({ _id: taskID });
        if (!task) {
            return res.status(404).json({ msg: `No task with id ${task}` })
        }
        res.status(200).json({ task })
    } catch (error) {
        return res.status(404).json(error)
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}