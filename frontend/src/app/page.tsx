'use client'
import { useEffect } from 'react';
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redireciona para a rota de autenticação
    router.push('/autenticacao');
  }, [router]);

  return (
    <main>
       
    </main>
  );
}
