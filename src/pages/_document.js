import { Html, Head, Main, NextScript } from "next/document";


export default function Document() {
  return (
    <Html lang="fr">
      <Head />
      <script src="https://cdn.tailwindcss.com"></script> {/*Remove this*/}
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
