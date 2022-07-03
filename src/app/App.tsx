// import VerifyCode from "../../lib/component/verifyCode";
import { KInput } from "design-06k4";

import { VerifyCode } from "@/../dist/lib";
import "@/../dist/lib/index.css";

// import { VerifyCode } from "@/../dist/lib/src/lib";
// import "@/../dist/lib/index.css";
// import { VerifyCode } from "@/lib";

function App() {
  return (
    <>
      <VerifyCode />
      <VerifyCode.RectCode />
    </>
  );
}

export default App;
