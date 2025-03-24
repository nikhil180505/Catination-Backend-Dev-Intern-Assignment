const Task = require("../models/tasks");

const createTask = async (req, res) => {
    try {
        const { title, description, status, dueDate } = req.body;
        const task = await Task.create({
            title,
            description,
            status,
            dueDate,
            userId: req.user.id
        });

        res.status(201).json({ task, message: "Task created successfully" });
    } catch (err) {
        console.error("Error creating task:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getTasks = async (req, res) => {
    try {
        const { status, dueDate, sort } = req.query;
        const userId = req.user.id;

        let filter = { userId };

        if (status) filter.status = status;
        if (dueDate) filter.dueDate = new Date(dueDate);

        let query = Task.find(filter);

        if (sort) {
            const sortOrder = sort === "asc" ? 1 : -1;
            query = query.sort({ createdAt: sortOrder });
        }

        const tasks = await query;
        res.status(200).json({ tasks });
    } catch (err) {
        console.error("Error fetching tasks:", err);
        res.status(500).json({ message: "Error fetching tasks" });
    } 
};
 

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findOneAndUpdate(
            { _id: id, userId: req.user.id },
            req.body, 
            { new: true, runValidators: true }
        );

        if (!task) {
            return res.status(404).json({ message: "Task not found or unauthorized" });
        }

        res.status(200).json({ message: "Task updated successfully", task });
    } catch (err) {
        console.error("Error updating task:", err);
        res.status(500).json({ message: "Error updating task" });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findOneAndDelete({ _id: id, userId: req.user.id });

        if (!task) {
            return res.status(404).json({ message: "Task not found or unauthorized" });
        }

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
        console.error("Error deleting task:", err);
        res.status(500).json({ message: "Error deleting task" });
    }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
  