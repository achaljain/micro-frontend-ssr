import { Button, Header } from "ui";

import MFESSR from "./MFE_SSR";
import MFECSR from "./MFE_CSR";

export default async function Page() {
  return (
    <div>
      <Header text="Next JS HOST App" />
      <Button />
      <div style={{ display: 'flex', padding: '2rem' }}>
        <div style={{ margin: '1rem' }}>
          <MFESSR />
        </div>
        <div style={{ margin: '1rem' }}>
          <MFECSR />
        </div>
      </div>
    </div>
  );
}
