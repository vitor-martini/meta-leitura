"use client";
import { useEffect, useState } from "react";
import { Container, ContentContainer } from "./styles";
import { Header } from "@/components/Header";
import { Input } from "@/components/Input";
import { TextCard } from "@/components/TextCard";
import { api } from "@/lib/api";
import { useTheme } from "styled-components";
import { CiSearch } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const TextDashboard = () => {
  const router = useRouter();
  const theme = useTheme();
  const [texts, setTexts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchTexts() {
      const response = await api.get(`/texts?name=${search}`);
      const texts = response?.data?.texts;
      setTexts(texts);
    }

    fetchTexts();
  }, [search]);

  useEffect(() => {
    const message = sessionStorage.getItem("messageStorage");
    if (message) {
      toast.success(message);
      sessionStorage.removeItem("messageStorage"); 
    }
  }, []);

  return (
    <Container>
      <Header/>
      <Input
        icon={CiSearch}
        placeholder={"Pesquise pelo título da leitura!"}
        width={"100%"}
        bgColor={theme.COLORS.WHITE}
        margin={"0 1.6rem"}
        onChange={(e => setSearch(e.target.value))}
      />
      <ContentContainer>
        {
          texts && texts.map(text => (
            <TextCard
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
