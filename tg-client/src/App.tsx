import { useEffect, useState } from "react";
import Greeting from "./components/Greeting/Greeting";
import useMainButton from "./hooks/useMainButton";
import StarCounter from "./components/StarCounter/StarCounter";
import { hapticFeedback, invoice, mainButton } from "@telegram-apps/sdk-react";
import request from "./api/api";
import useTg from "./hooks/useTg";

function App() {
  const [stars, setStars] = useState<number>(999);
  const { hideMainButton, showMainButton, initMainButton } = useMainButton();
  const { user } = useTg();

  const calcStars = (e: any) => {
    const userValue = e.target.value.trim();

    if (userValue && !isNaN(userValue) && userValue > 0) {
      showMainButton();
      setStars(+userValue);
    } else {
      hideMainButton();
      setStars(0);
    }
  };

  useEffect(() => {
    initMainButton();
  }, []);

  useEffect(() => {
    const handleClick = async () => {
      if (hapticFeedback.isSupported()) {
        hapticFeedback.impactOccurred("soft");
        console.log("haptic click!");
      }
      const resp = await request("donate", "POST", {
        amount: stars,
        userId: user?.id,
      });
      console.log(resp);
      invoice.open(resp.invoice_link.replace("https://t.me/$", ""));
    };

    mainButton.onClick(handleClick);

    return () => {
      mainButton.offClick(handleClick);
    };
  }, [stars]);

  return (
    <>
      <div className="container page">
        <Greeting />
        <h1>Задонатить звезды!</h1>
        <StarCounter stars={stars} calcStars={calcStars} />
      </div>
    </>
  );
}

export default App;
