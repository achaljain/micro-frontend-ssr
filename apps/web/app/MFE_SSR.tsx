import Script from 'next/script'

const id = 'mfe_ssr'

const MFERender = async () => {
  const res = await fetch('http://localhost:4173/ssr')
  const htmlStr = await res.text()

  return (
    <>
      <Script id='script_ssr' type="module">
        {
          `
            import { hydrate } from 'mfe1'
            hydrate(document.getElementById('${id}'))  
          `
        }
      </Script>
      <h1>MFE1 SSR</h1>
      <div id={id} dangerouslySetInnerHTML={{ __html: htmlStr }}></div>
    </>
  );
};

export default MFERender;
