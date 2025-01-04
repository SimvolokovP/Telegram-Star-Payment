import { mainButton } from "@telegram-apps/sdk-react";

const useMainButton = () => {
  const initMainButton = () => {
    mainButton.setParams({
      isVisible: false,
      isEnabled: true,
      hasShineEffect: true,
      text: "Donate",
    });
  };

  const showMainButton = () => {
    const prevState = mainButton.state();
    mainButton.setParams({ ...prevState, isVisible: true });
  };

  const hideMainButton = () => {
    const prevState = mainButton.state();
    mainButton.setParams({ ...prevState, isVisible: false });
  };

  return { showMainButton, hideMainButton, initMainButton };
};

export default useMainButton;
