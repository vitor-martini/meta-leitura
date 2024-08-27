import FireBaseStorage from "@/lib/fireBaseStorage";
import roles from "@/lib/roles";
const AppError = require("@/lib/appError");
const prisma = require("@/lib/prisma");
const bcrypt = require("bcrypt");
const getImageNameFromFireBaseUrl = require("@/lib/urlHelper");

const getUserById = async (id) => {
  const user = await prisma.user.findFirst({
    where: {
      id
    }
  });

  return user;
};

const getStudentById = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
      role: roles.STUDENT,
    },
    select: {
      name: true,
      email: true,
      grade: true
    }
  });

  if (!user) {
    throw new AppError("Estudante não encontrado!", 404);
  }

  const classUser = await prisma.classUser.findMany({
    where: {
      studentId: id,
    },
    include: {
      class: true,
    },
  });

  if (!classUser.length) {
    return { user };
  }

  const classes = await Promise.all(
    classUser.map(async (classUserEntry) => {
      const classId = classUserEntry.class.id;

      const texts = await prisma.classText.findMany({
        where: {
          classId: classId,
          text: {
            performances: {
              none: {
                studentId: id,
              },
            },
          },
        },
        include: {
          text: true,
        },
      });

      return {
        ...classUserEntry.class,
        texts: texts.map((textEntry) => textEntry.text),
      };
    })
  );

  const obj = {
    user,
    classes,
  };

  return obj;
};

const create = async ({ name, email, password }) => {
  const emailAlreadyRegister = await prisma.user.findFirst({
    where: {
      email
    }
  });

  if (emailAlreadyRegister) {
    throw new AppError("E-mail informado já cadastrado!", 400);
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  });
};

const update = async ({ userId, name, email, old_password, new_password }) => {
  const checkEmail = await prisma.user.findFirst({
    where: {
      email,
      id: {
        not: userId
      }
    }
  });

  if(checkEmail) {
    throw new AppError("E-mail já registrado a outro usuário!");
  }

  const user = await getUserById(userId);
  let password = user.password;
  if(old_password && new_password) {
    const isPasswordValid = await bcrypt.compare(old_password, user.password);
    if(!isPasswordValid) {
      throw new AppError("Senha antiga não confere!");
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(new_password, saltRounds);
    password = hashedPassword;
  }

  await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      name,
      email,
      password
    }
  });
};

const updateAvatar = async ({ userId, file }) => {
  const user = await getUserById(userId);
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = file.name;
  const fireBaseStorage = new FireBaseStorage();
  const uniqueFileName = await fireBaseStorage.save(fileName, buffer);

  if(user.avatarUrl) {
    const fileDeleteName = getImageNameFromFireBaseUrl(user.avatarUrl);
    fireBaseStorage.delete(fileDeleteName);
  }

  await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      avatarUrl: uniqueFileName
    }
  });

  return uniqueFileName;
};

module.exports = {
  create,
  update,
  getUserById,
  updateAvatar,
  getStudentById
};
