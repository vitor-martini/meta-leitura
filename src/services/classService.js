import generateRandomCode from "@/lib/generateRandomCode";
import roles from "@/lib/roles";
const AppError = require("@/lib/appError");
const prisma = require("@/lib/prisma");

const getByName = async (name, userId) => {
  if(!name) {
    name = "";  
  }

  const classes = await prisma.class.findMany({
    where: {
      name: {
        contains: name,
        mode: "insensitive"
      }, 
      active: true,
      teacherId: userId
    },
    orderBy: {
      name: "asc"
    }
  });

  return classes;
};

const deleteById = async (id, userId) => {
  const classroom = await prisma.class.findFirst({
    where: {
      id
    }
  });

  if(!classroom) {
    throw new AppError("Turma não encontrada!", 404);
  }

  if(classroom.teacherId !== userId) {
    throw new AppError("Você não é o professor da turma!", 404);
  }

  await prisma.class.update({
    where: {
      id: classroom.id
    },
    data: {
      active: false
    }
  });
};

const getById = async (id, userId) => {
  const classroom = await prisma.class.findFirst({
    where: {
      id: id
    },
    include: {
      teacher: true,
    }
  });

  if (!classroom) {
    throw new AppError("Turma não encontrada!", 404);
  }

  if(classroom.teacherId !== userId) {
    throw new AppError("Você não é o professor da turma!", 404);
  }

  const students = await prisma.user.findMany({
    where: {
      classUser: {
        some: {
          classId: id
        }
      }
    }
  });

  return {
    ...classroom,
    students: students
  };
};

const validateName = async(id, name) => {
  let classroom;
  if(id) {
    classroom = await prisma.class.findFirst({
      where: {
        name: name,
        active: true,
        id: {
          not: id
        }
      }
    });
  } else {
    classroom = await prisma.class.findFirst({
      where: {
        name,
        active: true,
      }
    });
  }

  if(classroom) {
    throw new AppError("Esse nome já está vinculado a outra turma!");
  }
};

const create = async ({ name, userId: teacherId }) => {
  const teacher = await prisma.user.findFirst({
    where: {
      id: teacherId,
      role: roles.TEACHER
    }
  });

  if(!teacher) {
    throw new AppError("Professor inválido!");
  }

  await validateName(null, name);

  const accessKey = generateRandomCode(8);
  const newClass = await prisma.class.create({
    data: {
      name,
      teacherId,
      accessKey
    }
  });

  return newClass;
};

const update = async ({ id, name, userId }) => {
  await validateName(id, name);
  const classroom = await prisma.class.findUnique({
    where: {
      id
    }
  });

  if(!classroom) {
    throw new AppError("Turma não encontrada!");
  }

  if(classroom.teacherId !== userId) {
    throw new AppError("Você não é o professor da turma!", 404);
  }

  await prisma.class.update({
    where: {
      id: id
    },
    data: {
      name: name
    }
  });
};

module.exports = {
  create,
  update,
  getById,
  getByName,
  deleteById
};
