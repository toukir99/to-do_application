const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const todoSchema = require('../schemas/todoSchema');

const Todo = new mongoose.model('Todo', todoSchema);

// GET ALL THE TODOS
router.get('/', async (req, res) => {
    try {
        const data = await Todo.find({ status: 'active' })
            .select({
                _id: 0,
                __v: 0,
                date: 0,
            })
            .exec();

        res.status(200).json({
            result: data,
            message: 'Success',
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: 'There was a server side error!',
        });
    }
});
// GET A TODO by ID
router.get('/:id', async (req, res) => {
    try {
        const data = await Todo.find({ _id: req.params.id });

        res.status(200).json({
            result: data,
            message: 'Success',
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: 'There was a server side error!',
        });
    }
});

// POST A TODO
router.post('/', async (req, res) => {
    try {
        const newTodo = new Todo(req.body);
        await newTodo.save();
        res.status(200).json({
            message: 'Todo was inserted successfully!',
        });
    } catch (err) {
        res.status(500).json({
            error: 'There was a server side error!',
        });
    }
});

// POST MULTIPLE TODO
router.post('/all', async (req, res) => {
    try {
        await Todo.insertMany(req.body);
        res.status(200).json({
            message: 'Todos were inserted successfully!',
        });
    } catch (err) {
        res.status(500).json({
            error: 'There was a server side error!',
        });
    }
});

// PUT TODO
router.put('/:id', async (req, res) => {
    try {
        const result = await Todo.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    status: 'inactive',
                },
            },
            {
                new: true,
                useFindAndModify: false,
            },
        );

        console.log(result);

        res.status(200).json({
            message: 'Todo was updated successfully!',
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: 'There was a server side error!',
        });
    }
});

// DELETE TODO
router.delete('/:id', async (req, res) => {
    try {
        await Todo.deleteOne({ _id: req.params.id });
        res.status(200).json({
            message: 'Todo was deleted successfully!',
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: 'There was a server side error!',
        });
    }
});

module.exports = router;
