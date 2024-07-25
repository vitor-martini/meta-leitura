"use client";
import { useEffect, useState } from "react";
import { Container } from "./styles";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, login } = useAuth();

  async function handleLogin() {
    const user = await login(email, password);
    if(user) {
      window.location.reload();
    }
  }

  useEffect(() => {
    if(user) {
      router.push("/");
    }
  });

  return (
    <Container>
      <input type="email" onChange={e => setEmail(e.target.value)}/>
      <input type="password" onChange={e => setPassword(e.target.value)}/>
      <button type="button" onClick={handleLogin}>LOGAR</button>
    </Container>
  );
};

export default SignIn;
