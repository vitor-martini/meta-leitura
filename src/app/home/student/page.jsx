"use client";
import { Container, ContentContainer, Logo } from "./styles";
import { Header } from "@/components/Header";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import roles from "@/lib/roles";

const HomeStudent = () => {
  const { user, getAuthUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchUserRole = async () => {
      const authUser = await getAuthUser();
      if (authUser?.role !== roles.STUDENT) {
        router.push("/");
      }
    };

    fetchUserRole();
  }, [user]);
  
  return (
    <Container>
      <Header/>
      <ContentContainer>
        <Logo src="/favicon.png" alt="Logo"/>
        <h1>Aperfeiçoe sua leitura!</h1>
      </ContentContainer>
    </Container>
  );
};

export default HomeStudent;
