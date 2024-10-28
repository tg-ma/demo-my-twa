import "./App.css";
import { TonConnectButton, useTonConnectUI } from "@tonconnect/ui-react";
import { useTonConnect } from "./hooks/useTonConnect";
import { useCounterContract } from "./hooks/useCounterContract";
import { beginCell } from "@ton/ton";
import { retrieveLaunchParams } from "@telegram-apps/sdk";

const transactionComment = beginCell()
  .storeUint(0, 32) // 写入32个零位以表示后面将跟随文本评论
  .storeStringTail("Hello, TON!") // 写下我们的文本评论  !!! 这里替换成充值单号，后端再定时拉取交易列表解析出comment中的这个内容就行
  .endCell();

const transaction = {
  validUntil: 10,
  messages: [
    {
      address: "0QBAYCAHf27D45T_EId2i0QLC1CFkICL4_86QANjn1Ju0CdL", // destination address
      amount: "20000000", //Toncoin in nanotons
      payload: transactionComment.toBoc().toString("base64"), // body中带有评论的载荷
    },
  ],
};

const getInitData = () => {
  const { initDataRaw } = retrieveLaunchParams();
  alert("initDataRaw:" + initDataRaw);
};

function App() {
  const { connected } = useTonConnect();
  const { value, address, sendIncrement } = useCounterContract();
  const [tonConnectUI] = useTonConnectUI();

  return (
    <div className="App">
      <div className="Container">
        <TonConnectButton />
        <h2>Edward TON.</h2>
        <div className="Card">
          <b>Counter Address</b>
          <div className="Hint">{address?.slice(0, 30) + "..."}</div>
        </div>

        <div className="Card">
          <b>Counter Value</b>
          <div>{value ?? "Loading..."}</div>
        </div>

        <a
          className={`Button ${connected ? "Active" : "Disabled"}`}
          onClick={() => {
            sendIncrement();
          }}
        >
          Increment
        </a>

        <a
          className={`Button ${connected ? "Active" : "Disabled"}`}
          onClick={() => {
            tonConnectUI.sendTransaction(transaction);
          }}
        >
          Send Ton
        </a>

        <a
          className="Active"
          onClick={() => {
            getInitData();
          }}
        >
          getInitData
        </a>
      </div>
    </div>
  );
}

export default App;
