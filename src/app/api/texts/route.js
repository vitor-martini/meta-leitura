import handleError from "@/lib/errorHandler";
import { verifyToken } from "@/middleware/authMiddleware";
import { verifyTeacherRole } from "@/middleware/teacherMiddleware";
const textController = require("@/controllers/textController");

export async function GET(req) {
  try {
    verifyToken(req);
    return await textController.index(req);
  } catch(error) {
    return handleError(error);
  }
}

export async function POST(req) {
  try {
    const tokenInfo =  verifyToken(req);
    verifyTeacherRole(tokenInfo);
    return await textController.create(req);
  } catch(error) {
    return handleError(error);
  }
}
export async function PUT(req) {
  try {
    const tokenInfo =  verifyToken(req);
    verifyTeacherRole(tokenInfo);
    return await textController.update(req);
  } catch(error) {
    return handleError(error);
  }
}