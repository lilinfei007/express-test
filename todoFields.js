const TODO_FIELDS = [
  { key: "name", required: true, message: "待办名称不能为空" },
  { key: "description", required: true, message: "待办详情不能为空" },
  { key: "time", required: true, message: "待办时间不能为空" },
];

const isEmptyValue = (value) => value === undefined || value === null || value === "";
const hasOwnProperty = (object, key) =>
  Object.prototype.hasOwnProperty.call(object, key);

const pickTodoData = (body = {}) => {
  return TODO_FIELDS.reduce((result, field) => {
    if (body[field.key] !== undefined) {
      result[field.key] = body[field.key];
    }

    return result;
  }, {});
};

const validateTodoData = (body = {}, options = {}) => {
  const { partial = false } = options;

  if (partial) {
    const hasAnyWritableField = TODO_FIELDS.some((field) =>
      hasOwnProperty(body, field.key)
    );

    if (!hasAnyWritableField) {
      return "至少传入一个可修改的字段";
    }

    const invalidField = TODO_FIELDS.find(
      (field) => hasOwnProperty(body, field.key) && isEmptyValue(body[field.key])
    );

    return invalidField ? invalidField.message : null;
  }

  const missingField = TODO_FIELDS.find(
    (field) => field.required && isEmptyValue(body[field.key])
  );

  return missingField ? missingField.message : null;
};

module.exports = {
  pickTodoData,
  validateTodoData,
};
