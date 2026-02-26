import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-8">Página não encontrada</p>
      <Link
        href="/"
        className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:opacity-90 transition"
      >
        Voltar para o início
      </Link>
    </div>
  );
}