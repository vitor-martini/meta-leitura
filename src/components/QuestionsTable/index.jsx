import { Fragment, useState } from "react";
import { FaPlus, FaMinus, FaTrashAlt } from "react-icons/fa";
import { Container, Table, TableRow, TableHeader, TableCell, ToggleButton, ChoicesRow } from "./styles";

export function QuestionsTable({ questions, setQuestions }) {
  const [expandedRows, setExpandedRows] = useState([]);

  function handleToggleChoices(index) {
    if (expandedRows.includes(index)) {
      setExpandedRows(expandedRows.filter((i) => i !== index));
    } else {
      setExpandedRows([...expandedRows, index]);
    }
  }

  function handleRemove(index) {
    setQuestions((prevQuestions) => prevQuestions.filter((_, i) => i !== index));
  }

  return (
    <Container>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Pergunta</TableHeader>
            <TableHeader>Ações</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {questions.map((question, i) => (
            <Fragment key={i}>
              <TableRow>
                <TableCell>{`${i + 1} - ${question.question}`}</TableCell>
                <TableCell>
                  <ToggleButton onClick={() => handleToggleChoices(i)}>
                    {expandedRows.includes(i) ? <FaMinus /> : <FaPlus />}
                  </ToggleButton>
                  <FaTrashAlt onClick={() => handleRemove(i)}/>
                </TableCell>
              </TableRow>
              {expandedRows.includes(i) && (
                <ChoicesRow>
                  <td colSpan="2">
                    <ul>
                      <li className={question.correctChoice === "A" ? "correct" : "incorrect"}>
                        {question.choiceA}
                      </li>
                      <li className={question.correctChoice === "B" ? "correct" : "incorrect"}>
                        {question.choiceB}
                      </li>
                      <li className={question.correctChoice === "C" ? "correct" : "incorrect"}>
                        {question.choiceC}
                      </li>
                      <li className={question.correctChoice === "D" ? "correct" : "incorrect"}>
                        {question.choiceD}
                      </li>
                    </ul>
                  </td>
                </ChoicesRow>
              )}
            </Fragment>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}