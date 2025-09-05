import Link from "next/link";

export default function HomePage() {
  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-bold">Benvenuto</h1>
      <p>Vai alla pagina per verificare la copertura fibra:</p>
      <Link href="/coverage" className="underline">Verifica copertura</Link>
    </main>
  );
}
