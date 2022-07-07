// import VerifyCode from "../../lib/component/verifyCode";

// import { VerifyCode } from "@/../dist/";
// import "@/../dist/index.css";
import { VerifyCode } from "stars-lib";
import "stars-lib/dist/index.css";

function App() {
  return (
    <>
      <VerifyCode />
      <VerifyCode.RectCode />
    </>
  );
}

export default App;
