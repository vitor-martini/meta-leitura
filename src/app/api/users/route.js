import handleError from "@/lib/errorHandler";
const userController = require("@/controllers/userController");

export async function POST(req) {
  try {
    return await userController.create(req);
  } catch(error) {
    return handleError(error);
  }
}