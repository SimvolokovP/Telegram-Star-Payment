import { User } from "@telegram-apps/sdk-react";
import useTg from "../../hooks/useTg";

import "./Greeting.scss";

const Greeting = () => {
  const { user } = useTg();

  const getUsername = (user: User) => {
    if (user) {
      return user.username
        ? user.username
        : user.firstName + " " + user.lastName;
    }
  };

  return (
    <div className="greeting">
      {user && <div className="greeting__name">Hello, {getUsername(user)}</div>}
      {user?.photoUrl && (
        <img
          className="greeting__avatar"
          src={user?.photoUrl}
          alt={getUsername(user)}
        />
      )}
    </div>
  );
};

export default Greeting;
