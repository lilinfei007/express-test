const express = require("express");
const cors = require("cors");
const { validateTodoData } = require("./todoFields.js");
const {
  getList,
  addTodo,
  updateTodoById,
  deleteTodoById,
} = require("./todoService.js");

const app = express();

const sendError = (res, message) => {
  return res.status(200).send({ status: 1, message });
};

app.use(express.json());
app.use(
  cors({
    origin: "http://127.0.0.1:5173",
    credentials: true,
  })
);

app.get("/list", (req, res) => {
  const data = getList();

  res.json({
    status: 0,
    data,
  });
});

app.post("/add", (req, res) => {
  const message = validateTodoData(req.body);
  if (message) {
    return sendError(res, message);
  }

  addTodo(req.body);
  res.status(200).send({ status: 0, message: "添加成功" });
});

const handleUpdateTodo = (req, res) => {
  if (!req.params.id) {
    return sendError(res, "待办id不能为空");
  }

  const message = validateTodoData(req.body, { partial: true });
  if (message) {
    return sendError(res, message);
  }

  const item = updateTodoById(req.params.id, req.body);
  if (!item) {
    return sendError(res, "待办不存在");
  }

  res.json({
    status: 0,
    message: "修改成功",
  });
};

app.put("/update/:id", handleUpdateTodo);
app.patch("/update/:id", handleUpdateTodo);

app.delete("/delete/:id", (req, res) => {
  if (!req.params.id) {
    return sendError(res, "待办id不能为空");
  }

  const deletedItem = deleteTodoById(req.params.id);
  if (!deletedItem) {
    return sendError(res, "待办不存在");
  }

  res.json({
    status: 0,
    message: "删除成功",
  });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(200).send({ status: 1, message: err.message });
});

app.listen(3000);
