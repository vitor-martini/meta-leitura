"use client";
import { HeaderContainer, Header, CoverContainer, CardContainer } from "./styles";
import bookPlaceholder from "@/assets/book-placeholder.png";
import Image from "next/image";

export function Card({ data }){
  const cover = data?.coverUrl ? `/uploads/${data.coverUrl}` : bookPlaceholder;

  return (
    <>
      {
        data && (
          <CardContainer>
            <HeaderContainer>
              <Header>
                <h1>{data.name}</h1>
              </Header>
            </HeaderContainer>
            <CoverContainer>
              <Image
                src={cover} 
                alt={`Capa do livro ${data.name}`}
                fill 
                quality={100}
                priority
              />
            </CoverContainer>
            <p>Dificuldade: {data.difficulty}</p>
          </CardContainer>
        )
      }
    </>
  );
} 
