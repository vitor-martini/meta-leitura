import roles from "@/lib/roles";
const AppError = require("@/lib/appError");
const prisma = require("@/lib/prisma");

const getByName = async (name) => {
  if(!name) {
    name = "";  
  }

  const classes = await prisma.class.findMany({
    where: {
      name: {
        contains: name,
        mode: "insensitive"
      }, 
      active: true
    },
    orderBy: {
      name: "asc"
    }
  });

  return classes;
};

const deleteById = async (id) => {
  const classroom = await prisma.class.findFirst({
    where: {
      id
    }
  });

  if(!classroom) {
    throw new AppError("Turma não encontrada!", 404);
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

const getById = async (id) => {
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
        id: {
          not: id
        }
      }
    });
  } else {
    classroom = await prisma.class.findFirst({
      where: {
        name
      }
    });
  }

  if(classroom) {
    throw new AppError("Esse nome já está vinculado a outra turma!");
  }
};

const create = async ({ name, teacher_id, access_key }) => {
  const teacher = await prisma.user.findFirst({
    where: {
      id: teacher_id,
      role: roles.TEACHER
    }
  });

  if(!teacher) {
    throw new AppError("Professor inválido!");
  }

  await validateName(null, name);
  const newClass = await prisma.class.create({
    data: {
      name,
      teacherId: teacher_id,
      accessKey: access_key
    }
  });

  return newClass;
};

const update = async ({ id, name }) => {
  await validateName(id, name);
  const classroom = await prisma.class.findUnique({
    where: {
      id
    }
  });

  if(!classroom) {
    throw new AppError("Turma não encontrada!");
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
