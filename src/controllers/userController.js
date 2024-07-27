const userService = require("@/services/userService");
const createResponse = require("@/lib/responseHelper");

const create = async (req) => {
  const { name, email, password } = await req.json();
  await userService.create({ name, email, password });
  
  return createResponse({ status: 201 });
};

module.exports = {
  create
};
