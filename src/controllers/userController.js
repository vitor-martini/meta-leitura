const userService = require("@/services/userService");
const createResponse = require("@/lib/responseHelper");

const fetchUsers = async (req) => {
  const users = await userService.getAllUsers();
  return createResponse({ body: users });
};

const create = async (req) => {
  const { name, email, password } = await req.json();
  await userService.create({ name, email, password });
  return createResponse({ status: 201 });
};

const show = async(userId) => {
  const user = await userService.getUserById(userId);
  console.log(user);

  return createResponse({ body: { user }});
};

module.exports = {
  fetchUsers,
  create,
  show
};
