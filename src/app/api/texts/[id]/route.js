import handleError from "@/lib/errorHandler";
import { verifyToken } from "@/middleware/authMiddleware";
import { verifyTeacherRole } from "@/middleware/teacherMiddleware";
const textController = require("@/controllers/textController");

export async function PUT(req, { params }) {
  try {
    const tokenInfo =  verifyToken(req);
    verifyTeacherRole(tokenInfo);
    const textId = Number(params.id);

    return await textController.update(req, textId);
  } catch(error) {
    return handleError(error);
  }
}

export async function GET(req, { params }) {
  try {
    const tokenInfo =  verifyToken(req);
    verifyTeacherRole(tokenInfo);    
    const textId = Number(params.id);

    return await textController.show(textId);
  } catch(error) {
    return handleError(error);
  }
}

export async function DELETE(req, { params }) {
  try {
    const tokenInfo =  verifyToken(req);
    verifyTeacherRole(tokenInfo);
    const textId = Number(params.id);

    return await textController.destroy(textId);
  } catch(error) {
    return handleError(error);
  }
}