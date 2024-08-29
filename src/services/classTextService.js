const AppError = require("@/lib/appError");
const prisma = require("@/lib/prisma");

const show = async (classId, textId, studentId) => {
  let done = false; 
  const classText = await prisma.classText.findFirst({
    where: {
      classId,
      textId
    }
  });

  if(!classText) {
    throw new AppError("Texto não encontrado!", 404);
  }

  const text = await prisma.text.findFirst({
    where: {
      id: textId
    }
  });

  const questions = await prisma.question.findMany({
    where: {
      textId: text.id,
      active: true
    },
    orderBy: {
      createdAt: "asc"
    }
  });

  for(const question of questions) {
    const choices = await prisma.choice.findMany({
      where: {
        questionId: question.id
      }
    });

    question.choices = choices;
    const answer = await prisma.answer.findFirst({
      where: {
        questionId: question.id,
        studentId
      }
    });

    if(answer) {
      done = true;
      question.selectedChoiceId = answer.choiceId;
    }
  }

  const textObj = {
    done,
    text,
    questions
  };

  return textObj;
};

const createAnswer = async (classId, textId, userId, questions) => {
  const validatePerformance = await prisma.performance.findFirst({
    where: {
      studentId: userId,
      classId,
      textId
    }
  });

  if(validatePerformance) {
    throw new AppError("Essa leitura já foi respondida pelo aluno!", 400);
  }

  try {
    await prisma.$transaction(async (prisma) => {
      const numberOfQuestions = questions.length;
      let grade = 0;
  
      for(let question of questions) {

        await prisma.answer.create({
          data: {
            questionId: question.id,
            choiceId: question.selectedChoiceId,
            studentId: userId          
          }
        });
  
        const correctChoiceId = question.choices.filter(q => q.isCorrect);
        if(correctChoiceId === question.selectedChoiceId) {
          grade+=10;
        }
      }
  
      grade = Number((grade / numberOfQuestions).toFixed(2));
      await prisma.performance.create({
        data: {
          studentId: userId,
          classId,
          textId,
          grade
        }
      });
  
      const numberOfTexts = await prisma.classText.count({
        where: {
          classId
        }
      });
  
      const totalGrade = await prisma.performance.aggregate({
        _sum: {
          grade: true,
        },
        where: {
          studentId: userId
        }
      });
  
      const finalGrade = Number((totalGrade / numberOfTexts).toFixed(2));
      await prisma.user.update({
        where: {
          id: userId
        },
        data: {
          grade: finalGrade
        }
      });
    });
  } catch(error) {
    console.log(error);
  }
  
};

module.exports = {
  show,
  createAnswer
};
