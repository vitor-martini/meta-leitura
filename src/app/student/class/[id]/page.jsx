"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Container, 
  ContentContainer, 
  BackButtonContainer,
  FieldsContainer, 
  ButtonsContainer,
  ModalContent, 
  ModalButtonsContent,
  AccessKeyContainer,
  AccessKeyWrapper,
  ItensContainer,
  HeaderContainer
} from "./styles";
import { Header } from "@/components/Header";
import { Input } from "@/components/Input";
import { SearchText } from "@/components/SearchText";
import { Text } from "@/components/Text";
import { IoMdArrowRoundBack } from "react-icons/io";
import { api } from "@/lib/api";

const EditClass = () => {
  const { id } = useParams(); 
  const router = useRouter();
  const [classroom, setClassroom] = useState({}); 
  const [doneTexts, setDoneTexts] = useState([]); 
  const [undoneTexts, setUndoneTexts] = useState([]); 

  useEffect(() => {
    async function fetchClass() {
      try {
        const result = await api.get(`/classes/${id}`);
        const classroom = result?.data?.classroom;
        const texts = classroom?.texts;
        const student = classroom?.students[0];
        const performancesTextsID = student?.performances?.map(x => x.text.id);
  
        const doneTexts = texts
          .filter(x => performancesTextsID?.includes(x.id))
          .map(text => {
            const performance = student.performances.find(perf => perf.text.id === text.id);
            return {
              ...text,
              grade: performance?.grade
            };
          });
  
        const undoneTexts = texts.filter(x => !doneTexts?.map(y => y.id).includes(x.id));
  
        setUndoneTexts(undoneTexts);
        setDoneTexts(doneTexts);
        setClassroom(classroom);
      } catch {
        router.push("/student/class");
      }
    }
  
    fetchClass();
  }, [id]);

  return (
    <Container>
      <Header />
      <ContentContainer>
        <h1>{classroom?.name}</h1>
        <h2>{`Professor(a) ${classroom?.teacher?.name}`}</h2>
        <BackButtonContainer onClick={() => router.push("/student/class")}>
          <IoMdArrowRoundBack size={60}/>
        </BackButtonContainer>
      </ContentContainer>
      <ContentContainer>
        <h2>Leituras Pendentes</h2>
        {
          undoneTexts && 
          undoneTexts.length > 0 && 
          (
            <ItensContainer>
            {
              undoneTexts.map((t, i) => (
                <Text 
                  key={i}
                  index={i}
                  text={t}
                  setClassroom={setClassroom}
                  classroom={classroom}
                />
              ))
            }
          </ItensContainer>
          )
        }
      </ContentContainer>
      <ContentContainer>
        <h2>Leituras Entregues</h2>
        {
          doneTexts && 
          doneTexts.length > 0 && 
          (
            <ItensContainer>
            {
              doneTexts.map((t, i) => (
                <Text 
                  key={i}
                  index={i}
                  text={t}
                  setClassroom={setClassroom}
                  classroom={classroom}
                />
              ))
            }
          </ItensContainer>
          )
        }
      </ContentContainer>
    </Container>
  );
};

export default EditClass;
