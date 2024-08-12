const classService = require("@/services/classService");
const createResponse = require("@/lib/responseHelper");
const AppError = require("@/lib/appError");

const index = async (req, name) => {
  const classroom = await classService.getByName(name);
  return createResponse({ body: { classroom: classroom }, status: 200 });
};

const show = async (classId) => {
  const classroom = await classService.getById(classId);
  return createResponse({ body: { classroom }, status: 200 });
};

const destroy = async (classId) => {
  await classService.deleteById(classId);
  return createResponse({ body: { message: "Inativado com sucesso!"}, status: 200 });
};

const create = async (req) => {
  const { name, teacher_id, access_key } = await req.json();
  if(!name || !teacher_id || !access_key) {
    throw new AppError("Dados obrigatórios não informados!", 400);
  }

  const id = await classService.create({ name, teacher_id, access_key });
  return createResponse({ body: { id }, status: 201 });
};

const update = async (req, classId) => {
  const { name } = await req.json();
  if(!name) {
    throw new AppError("Dados obrigatórios não informados!", 400);
  }

  await classService.update({ id: classId, name });
  return createResponse({ status: 201 });
};

module.exports = {
  create,
  update,
  index,
  show,
  destroy
};
