"use client";
import { Container } from "./styles";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { ChoiceInput } from "@/components/ChoiceInput";
import { QuestionsTable } from "@/components/QuestionsTable";
import { useState } from "react";
import { toast } from "react-toastify";

export function Questions({ questions, setQuestions }) {
  const [question, setQuestion] = useState("");
  const [choiceA, setChoiceA] = useState("");
  const [choiceB, setChoiceB] = useState("");
  const [choiceC, setChoiceC] = useState("");
  const [choiceD, setChoiceD] = useState("");
  const [selectedChoice, setSelectedChoice] = useState("");

  function handleCheck(choice) {
    setSelectedChoice(choice);
  }

  function clearFields() {
    setQuestion("");
    setChoiceA("");
    setChoiceB("");
    setChoiceC("");
    setChoiceD("");
    setSelectedChoice("");
  }

  function handleInsertQuestion() {
    if(!question || !choiceA || !choiceB || !choiceC || !choiceD) {
      toast.error("Preencha todos os campos!");
      return;
    }

    if(!selectedChoice) {
      toast.error("Selecione uma opção para ser a correta!");
      return;
    }

    const questionObj = {
      question,
      choiceA,
      choiceB,
      choiceC,
      choiceD,
      correctChoice: selectedChoice
    };

    setQuestions([...questions, questionObj]);
    clearFields();
  }

  return (
    <Container>
      <Input 
        placeholder="Pergunta"
        value={question}
        onChange={e => setQuestion(e.target.value)}
      />
      
      <ChoiceInput 
        label="Opção A"
        value={choiceA}
        setValue={setChoiceA}
        checked={selectedChoice === "A"}
        onCheck={() => handleCheck("A")}
      />
      <ChoiceInput 
        label="Opção B"
        value={choiceB}
        setValue={setChoiceB}
        checked={selectedChoice === "B"}
        onCheck={() => handleCheck("B")}
      />
      <ChoiceInput 
        label="Opção C"
        value={choiceC}
        setValue={setChoiceC}
        checked={selectedChoice === "C"}
        onCheck={() => handleCheck("C")}
      />
      <ChoiceInput 
        label="Opção D"
        value={choiceD}
        setValue={setChoiceD}
        checked={selectedChoice === "D"}
        onCheck={() => handleCheck("D")}
      />

      <Button
        title={"Inserir"}
        onClick={handleInsertQuestion}
      />
      {
        questions && questions.length > 0 && (
          <QuestionsTable
            questions={questions}
            setQuestions={setQuestions}
          />
        )
      }
    </Container>
  );
}