import express from "express"; // ok
import cors from "cors"; // ok

const app = express();

// ❌ [no-console]
console.log("Starting server...");

app.use(cors());
// ❌ [no-empty-function]
app.use((_req, _res, _next) => {});

app.use(express.json());

type Todo = { id: string; title: string; done: boolean };
const todos: Todo[] = [];

// ❌ [no-unused-vars]
const unused = 42;

app.get("/todos", (req, res) => {
    // ❌ [no-var]
    var x = 1;

    res.json(todos);
});

app.post("/todos", (req, res) => {
    // ❌ [@typescript-eslint/no-explicit-any]
    const body: any = req.body;

    const todo: Todo = {
        id: Date.now().toString(),
        title: body.title,
        done: false,
    };

    todos.push(todo);
    res.status(201).json(todo);
});

app.put("/todos/:id", async (req, res) => {
    // ❌ [promise/always-return] — pas de `return` dans async
    const idx = todos.findIndex(t => t.id === req.params.id);

    // ❌ [security/detect-object-injection]
    if (idx === -1) res.status(404).json({ error: "Not found" });

    todos[idx] = { ...todos[idx], ...req.body };
    res.json(todos[idx]);
});

app.delete("/todos/:id", (req, res) => {
    const idx = todos.findIndex(t => t.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: "Not found" });

    const [removed] = todos.splice(idx, 1);
    res.json(removed);
});

const PORT = process.env.PORT ?? 8080;

// ❌ [no-console]
console.log("App ready");

app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`)); // ❌ [no-console]
