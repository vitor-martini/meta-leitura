const { fetchUsers } = require("../../../controllers/userController");
const { verifyToken } = require("../../../middleware/authMiddleware");
const errorHandler = require("../../../utils/errorHandler");

export async function GET(req) {
  try {
    verifyToken(req);
    return fetchUsers(req);
  } catch (error) {
    return errorHandler(error);
  }
}
