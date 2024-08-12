import handleError from "@/lib/errorHandler";
import { verifyToken } from "@/middleware/authMiddleware";
import { verifyTeacherRole } from "@/middleware/teacherMiddleware";
const classController = require("@/controllers/classController");

export async function GET(req) {
  try {
    verifyToken(req);
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");
    
    return await classController.index(req, name);
  } catch(error) {
    return handleError(error);
  }
}

export async function POST(req) {
  try {
    const tokenInfo =  verifyToken(req);
    verifyTeacherRole(tokenInfo);
    return await classController.create(req);
  } catch(error) {
    return handleError(error);
  }
}