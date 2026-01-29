const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// Crear tarea
router.post("/create", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).send(task);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error al crear la tarea" });
  }
});

// Obtener todas las tareas
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).send(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error al obtener las tareas" });
  }
});

// Obtener tarea por ID
router.get("/id/:_id", async (req, res) => {
  try {
    const task = await Task.findById(req.params._id);
    if (!task) return res.status(404).send({ message: "Tarea no encontrada" });
    res.status(200).send(task);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error al obtener la tarea" });
  }
});

// Marcar tarea como completada
router.put("/markAsCompleted/:_id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params._id, { completed: true }, { new: true });
    if (!task) return res.status(404).send({ message: "Tarea no encontrada" });
    res.status(200).send(task);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error al marcar la tarea como completada" });
  }
});

// Actualizar solo el título de la tarea
router.put("/id/:_id", async (req, res) => {
  try {
    const updates = { title: req.body.title };
    const task = await Task.findByIdAndUpdate(req.params._id, updates, { new: true });
    if (!task) return res.status(404).send({ message: "Tarea no encontrada" });
    res.status(200).send(task);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error al actualizar la tarea" });
  }
});

// Eliminar tarea
router.delete("/id/:_id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params._id);
    if (!task) return res.status(404).send({ message: "Tarea no encontrada" });
    res.status(200).send({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error al eliminar la tarea" });
  }
});

module.exports = router;
