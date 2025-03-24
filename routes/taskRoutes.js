const express = require("express");
const { createTask, getTasks, updateTask, deleteTask } = require("../controllers/taskController");
const { jwtAuthMiddleware } = require("../jwt");

const router = express.Router();

router.post("/", jwtAuthMiddleware, createTask);
router.get("/", jwtAuthMiddleware, getTasks);
router.put("/:id", jwtAuthMiddleware, updateTask);
router.delete("/:id", jwtAuthMiddleware, deleteTask);

module.exports = router;
   