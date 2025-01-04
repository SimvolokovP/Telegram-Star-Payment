import { useLaunchParams } from "@telegram-apps/sdk-react";

const useTg = () => {
  const lp = useLaunchParams();

  const user = lp.initData?.user;

  return { user };
};

export default useTg;
