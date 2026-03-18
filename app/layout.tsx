import { ProviderWrapper } from "../lib/provider-wrapper";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className='bg-background text-foreground antialiased transition-colors duration-300'>
        <ProviderWrapper>{children}</ProviderWrapper>
      </body>
    </html>
  );
}
