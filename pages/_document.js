import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className="uk-background-white dark:uk-background-gray-100 dark:uk-text-gray-20">
      <Head>
          <title>CantoPals - Premium NFTs on Canto</title>
        </Head>
      <body className="uni-body">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
