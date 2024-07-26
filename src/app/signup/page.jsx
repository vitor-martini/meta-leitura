"use client";
import { Container, SignUpContainer } from "./styles";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { api } from "@/lib/api";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { user, logout } = useAuth();
  const router = useRouter();

  function validateInput() {
    if(!name || !email || !password || !confirmPassword) {
      toast.error("Preencha todos os campos!");
      return false;
    }

    if(!email.includes("@")) {
      toast.error("E-mail inválido!");
      return false;
    }

    if(password !== confirmPassword) {
      toast.error("As senhas não conferem!");
      return false;
    }

    return true;
  }

  async function handleSignUp() {
    if(!validateInput()) {
      return;
    }

    try {
      await api.post("/users", {name, email, password});
      toast.success("Cadastro com sucesso!");
      router.push("/");
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      if(errorMessage) {
        toast.error(errorMessage);
      } else {
        console.log(error);
        toast.error("Não foi possível cadastrar.");
      }
    }
  }

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  return (
    <Container>
      <SignUpContainer>
        <h1>Faça seu cadastro!</h1>
        <Input
          icon={FaUser}
          placeholder="Nome"
          type="text"
          onChange={e => setName(e.target.value)}
        />
        <Input 
            icon={MdEmail}
            placeholder="E-mail"
            type="email"
            onChange={e => setEmail(e.target.value)}
        />
        <Input
          icon={RiLockPasswordFill}
          placeholder="Senha"
          type="password"
          onChange={e => setPassword(e.target.value)}
        />
        <Input
          icon={RiLockPasswordFill}
          placeholder="Confirmar senha"
          type="password"
          onChange={e => setConfirmPassword(e.target.value)}
        />
        <Button
          title={"Cadastrar"}
          onClick={handleSignUp}
        />
      </SignUpContainer>
    </Container>
  );
};

export default SignUp;
