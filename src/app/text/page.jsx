"use client";
import { useEffect, useState } from "react";
import { Container, ContentContainer } from "./styles";
import { Header } from "@/components/Header";
import { Card } from "@/components/Card";
import { api } from "@/lib/api";

const TextDashboard = () => {
  const [texts, setTexts] = useState([]);

  useEffect(() => {
    async function fetchTexts() {
      const response = await api.get("/texts");
      const texts = response?.data?.texts;
      console.log(texts);
      setTexts(texts);
    }

    fetchTexts();
  }, []);

  return (
    <Container>
      <Header/>
      <ContentContainer>
        {
          texts.map(text => (
            <Card
              key={text.id}
              data={text} 
            />
          ))
        }
      </ContentContainer>
    </Container>
  );
};

export default TextDashboard;
