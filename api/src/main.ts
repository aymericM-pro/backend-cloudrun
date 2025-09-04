import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

type Todo = { id: string; title: string; done: boolean };
const todos: Todo[] = [];

app.get("/todos", (_, res) => res.json(todos));

app.post("/todos", (req, res) => {
    const todo: Todo = {
        id: Date.now().toString(),
        title: req.body.title,
        done: false,
    };
    todos.push(todo);
    res.status(201).json(todo);
});

app.put("/todos/:id", (req, res) => {
    const idx = todos.findIndex(t => t.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: "Not found" });
    todos[idx] = { ...todos[idx], ...req.body };
    res.json(todos[idx]);
});

app.delete("/todos/:id", (req, res) => {
    const idx = todos.findIndex(t => t.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: "Not found" });
    const [removed] = todos.splice(idx, 1);
    res.json(removed);
});

const PORT = process.env.PORT ?? "3000";

app.listen(3000, () => console.log(`API running on http://localhost:3000}`));
