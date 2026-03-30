const fs = require("fs");
const path = require("path");
const { getUUID } = require("./utils.js");
const { pickTodoData } = require("./todoFields.js");

const LIST_PATH = path.join(__dirname, "./list.json");

const getList = () => {
  const data = fs.readFileSync(LIST_PATH, "utf-8");
  return JSON.parse(data);
};

const writeList = (list) => {
  fs.writeFileSync(LIST_PATH, JSON.stringify(list));
};

const addTodo = (body = {}) => {
  const fileData = getList();
  const todo = {
    id: getUUID(),
    ...pickTodoData(body),
    status: 0,
  };

  fileData.push(todo);
  writeList(fileData);
  return todo;
};

const updateTodoById = (id, body = {}) => {
  const fileData = getList();
  const item = fileData.find((todo) => todo.id === id);

  if (!item) {
    return null;
  }

  Object.assign(item, pickTodoData(body));
  writeList(fileData);
  return item;
};

const deleteTodoById = (id) => {
  const fileData = getList();
  const index = fileData.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  const [deletedItem] = fileData.splice(index, 1);
  writeList(fileData);
  return deletedItem;
};

module.exports = {
  getList,
  addTodo,
  updateTodoById,
  deleteTodoById,
};
