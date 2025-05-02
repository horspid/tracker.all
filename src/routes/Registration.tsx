import Input from "@components/ui/Input";
import UserICO from "@assets/images/icons/user.svg?react";
import PasswordICO from "@assets/images/icons/password.svg?react";
import VkICO from "@assets/images/icons/vk.svg?react";
import FacebookICO from "@assets/images/icons/facebook.svg?react";
import AppleICO from "@assets/images/icons/apple.svg?react";
import GoogleICO from "@assets/images/icons/google.svg?react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { signUp } from "@services/userAuth";
import { useUserStore } from "@store/userStore";

const Registration = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [login, setLogin] = useState<string>("");

  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "login") setLogin(value);
  };

  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { setUser, setSession } = useUserStore.getState();
      const result = await signUp(email, password, login);

      if (result) {
        setSession(result.session);
        setUser(result.user);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Ошибка при регистрации: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    if (user) {
      navigate(`/profile/${user.user_metadata.login}`);
    }
  }, [user, navigate]);

  return (
    <section className="section-container">
      <form
        onSubmit={onSubmitHandler}
        className=" w-max m-auto text-white p-40 text-center"
      >
        <h1 className="text-4xl font-bold">Регистрация</h1>
        <div className="flex flex-col gap-20 mt-40">
          <Input
            Icon={UserICO}
            placeholder="Email"
            type="email"
            value={email}
            name="email"
            onChange={(event) => onChangeHandler(event)}
          />
          <Input
            Icon={PasswordICO}
            placeholder="Password"
            type="password"
            value={password}
            name="password"
            onChange={(event) => onChangeHandler(event)}
          />
          <Input
            Icon={PasswordICO}
            placeholder="Login"
            type="text"
            value={login}
            name="Ваш"
            onChange={(event) => onChangeHandler(event)}
          />
        </div>
        <div className="flex gap-20 justify-center mt-40">
          <VkICO />
          <FacebookICO />
          <AppleICO />
          <GoogleICO />
        </div>
        <input
          type="submit"
          className="w-full py-20 bg-red rounded-2xl mt-40 cursor-pointer font-bold text-lg"
          value="Заргистрироваться"
        />
        <p className="mt-40">
          <span className="text-grey">Уже зарегистрированы?</span>
          <span className="ml-10">
            <Link to={"/login"}>Войти</Link>
          </span>
        </p>
      </form>
    </section>
  );
};

export default Registration;
