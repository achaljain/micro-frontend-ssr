'use client'

import Script from 'next/script'

const id = 'mfe_csr'

const MFERender = () => {
  return (
    <>
      <Script id='script_csr' type="module">
        {
          `
            import { csr } from 'mfe1'
            csr(document.getElementById('${id}'))  
          `
        }
      </Script>
      <h1>MFE1 CSR</h1>
      <div id={id}></div>
    </>
  );
};

export default MFERender;
