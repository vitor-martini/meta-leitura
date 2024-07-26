const AppError = require("@/lib/appError");
const userController = require("@/controllers/userController");
const { verifyToken } = require("@/middleware/authMiddleware");
const errorHandler = require("@/lib/errorHandler");

export async function GET(req) {
  try {
    const { userId } = verifyToken(req);
    const { pathname } = new URL(req.url);
    const requestUserID = pathname.split("/").pop();

    if (!requestUserID) {
      throw new AppError("User ID é obrigatório", 400);
    }

    if(Number(userId) !== Number(requestUserID)) {
      throw new AppError("Unauthorized", 401);
    }
    
    return await userController.show(userId);
  } catch (error) {
    return errorHandler(error);
  }
}
