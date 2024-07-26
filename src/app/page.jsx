"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";
import roles from "@/lib/roles";

export default function Home() {
  const { user, getUserRole, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user) {
        router.push("/signin");
        return;
      }
      const role = await getUserRole();
      if (role === roles.TEACHER) {
        router.push("/home/teacher");
      } else {
        router.push("/home/student");
      }
    };

    fetchUserRole();
  }, [user]);

  return (
    <></>
  );
}
