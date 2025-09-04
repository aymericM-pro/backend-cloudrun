import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

type Todo = { id: string; title: string; done: boolean };
const todos: Todo[] = [];

app.get("/todos", (_, res) => {
    res.json(todos);
});

app.post("/todos", (req, res) => {
    const { title } = req.body;
    if (typeof title !== "string") {
        return res.status(400).json({ error: "Invalid title" });
    }

    const todo: Todo = {
        id: Date.now().toString(),
        title,
        done: false,
    };

    todos.push(todo);
    res.status(201).json(todo);
});

app.put("/todos/:id", (req, res) => {
    const { title, done } = req.body;
    const { id } = req.params;

    if (typeof id !== "string") {
        return res.status(400).json({ error: "Invalid id" });
    }

    const idx = todos.findIndex(t => t.id === id);
    if (idx === -1) {
        return res.status(404).json({ error: "Not found" });
    }

    if (title !== undefined && typeof title !== "string") {
        return res.status(400).json({ error: "Invalid title" });
    }
    if (done !== undefined && typeof done !== "boolean") {
        return res.status(400).json({ error: "Invalid done status" });
    }

    todos[idx] = {
        ...todos[idx],
        ...(title !== undefined ? { title } : {}),
        ...(done !== undefined ? { done } : {}),
    };

    res.json(todos[idx]);
});

app.delete("/todos/:id", (req, res) => {
    const { id } = req.params;
    if (typeof id !== "string") {
        return res.status(400).json({ error: "Invalid id" });
    }

    const idx = todos.findIndex(t => t.id === id);
    if (idx === -1) {
        return res.status(404).json({ error: "Not found" });
    }

    const [removed] = todos.splice(idx, 1);
    res.json(removed);
});

const PORT = process.env.PORT ?? "8080";
console.warn(`API running on http://localhost:${PORT}`);
app.listen(PORT);
