"use client";
import Board from "@/components/Board";
import Header from "@/components/Header";
import { useUserStore } from "@/store/UserStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const getUser = useUserStore((state) => state.getUserData);
  const router = useRouter();
  useEffect(() => {
    getUser()
      .then((res) => {
        router.push("/");
      })
      .catch(() => router.push("/login"));
  }, [getUser, router]);

  return (
    <main>
      <Header />
      <Board />
    </main>
  );
}
