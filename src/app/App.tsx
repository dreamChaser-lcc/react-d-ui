import { Button } from "antd";
import React, { useState } from "react";
import { VerifyCode,  } from "../../lib";
import Detail from "../detail";
import Table from "../table";


// import { VerifyCode } from "../../dist";
// import { VerifyCode ,DynamicModal} from "../../dist";

// import { VerifyCode } from "@/../dist/";
import "@/../dist/index.css";

// npm线上包
// import { VerifyCode } from "stars-lib";
// import "stars-lib/dist/index.css";

function App() {
  const [disabled, setDisabled] = useState<boolean>(false);
  const open = () => {
    setDisabled(true);
  };
  const close = () => {
    setDisabled(false);
  };
  return (
    <>
      {/* <VerifyCode />
      <VerifyCode.RectCode /> */}
      {/* <Button type="primary" onClick={open}>
        打开弹窗
      </Button>
      <DynamicModal
        visible={disabled}
        onCancel={close}
        title={"自定义头部"}
        bodyExtraClass="body-extra"
      /> */}
      {/* <Table></Table> */}
      <Detail></Detail>
    </>
  );
}

export default App;
