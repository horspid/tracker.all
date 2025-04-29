// import logo from "@assets/images/logo.svg";
import { useNavigate } from "react-router";

const Logo = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center cursor-pointer"
      onClick={() => navigate(`/`)}
    >
      {/* <img className="logo__img" src={logo} alt="logo" /> */}
      <div className="text-3xl">
        <span className="font-bold text-red">tracker</span>
        <span className="font-medium text-white">.all</span>
      </div>
    </div>
  );
};

export default Logo;
