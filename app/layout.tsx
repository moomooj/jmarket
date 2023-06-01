import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head></head>
      <body>
        <div className="mx-auto w-full max-w-lg">{children}</div>
      </body>
    </html>
  );
}
