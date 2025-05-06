import SignICO from "@assets/images/icons/sign.svg?react";
import { useNavigate } from "react-router";
import { logout } from "@services/userAuth";

interface SignProps {
  className: string;
  name: string;
  isLoggedIn: boolean;
}

const Sign = ({ className, name, isLoggedIn }: SignProps) => {
  const navigate = useNavigate();

  const onClickHandler = async () => {
    if (isLoggedIn) {
      await logout();
      navigate(`/login`);
    }
  };

  return (
    <div
      className="flex gap-10 items-center bottom-20"
      onClick={onClickHandler}
    >
      {className === "in" ? <SignICO /> : <SignICO className="rotate-180" />}
      <span className="text-xl font-semibold">{name}</span>
    </div>
  );
};

export default Sign;
