import Input from "@components/ui/Input";
import UserICO from "@assets/images/icons/user.svg?react";
import PasswordICO from "@assets/images/icons/password.svg?react";
import VkICO from "@assets/images/icons/vk.svg?react";
import FacebookICO from "@assets/images/icons/facebook.svg?react";
import AppleICO from "@assets/images/icons/apple.svg?react";
import GoogleICO from "@assets/images/icons/google.svg?react";
import { Link, useNavigate } from "react-router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { signIn } from "@services/userAuth";
import { useUserStore } from "@store/userStore";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { setSession, setUser } = useUserStore.getState();
      const result = await signIn(email, password);

      if (result) {
        setUser(result.user);
        setSession(result.session);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Ошибка при авторизации: ${error.message}`);
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
        <h1 className="text-4xl font-bold">Авторизация</h1>
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
          value="Вход"
        />
        <p className="mt-40">
          <span className="text-grey">Еще не зарегистрированы?</span>
          <span className="ml-10">
            <Link to={"/registration"}>Регистрация</Link>
          </span>
        </p>
      </form>
    </section>
  );
};

export default Login;
