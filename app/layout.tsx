export const metadata = {
  title: "Verifica Copertura Fibra",
  description: "Controlla la copertura fibra al tuo indirizzo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>
        <div className="container">{children}</div>
      </body>
    </html>
  );
}
