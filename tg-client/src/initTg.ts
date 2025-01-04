import {
  backButton,
  viewport,
  themeParams,
  miniApp,
  initData,
  $debug,
  init as initSDK,
  mainButton,
} from "@telegram-apps/sdk-react";

export function initTg(): void {
  //   $debug.set(true);

  initSDK();

  backButton.mount();
  miniApp.mount();
  mainButton.mount();
  themeParams.mount();
  initData.restore();

  viewport
    .mount()
    .catch((e) => {
      console.error("Something went wrong mounting the viewport", e);
    })
    .then(() => {
      viewport.expand();
      viewport.bindCssVars();
    });

  miniApp.bindCssVars();
  themeParams.bindCssVars();
}
