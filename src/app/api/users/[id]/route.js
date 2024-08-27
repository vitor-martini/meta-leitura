import handleError from "@/lib/errorHandler";
import { verifyToken } from "@/middleware/authMiddleware";
const userController = require("@/controllers/userController");

export async function GET(req, { params }) {
  try {
    verifyToken(req);
    const userId = Number(params.id);
    return await userController.getStudentById(userId);
  } catch(error) {
    return handleError(error);
  }
}