import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script id="importmap" type="importmap">
          {`{
            "imports": {
                "react": "https://esm.sh/react",
                "react-dom": "https://esm.sh/react-dom",
                "mfe1": "http://localhost:4173/mfe1.js"
            },
            "scopes": {}
        }`}
        </Script>
        <link rel="stylesheet" href="http://localhost:4173/style.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
