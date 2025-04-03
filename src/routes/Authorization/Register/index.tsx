import styles from "./Register.module.scss";
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
      await signUp(email, password, login);
    } catch (error: any) {
      console.error("Ошибка при регистрации", error.message);
    }
  };

  useEffect(() => {
    if (user) {
      navigate(`/profile/${user.user_metadata.login}`);
    }
  }, [user, navigate]);

  return (
    <section className={styles.registration}>
      <form onSubmit={onSubmitHandler}>
        <h1>Registration</h1>
        <div className={styles.registration__inputs}>
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
            name="login"
            onChange={(event) => onChangeHandler(event)}
          />
        </div>
        <div className={styles.registration__oauth}>
          <VkICO />
          <FacebookICO />
          <AppleICO />
          <GoogleICO />
        </div>
        <Input
          type="submit"
          className={styles.registration__button}
          value="Sign up"
        />
        <p className={styles.registration__login}>
          Already have account?{" "}
          <span>
            <Link to={"/login"}>Login</Link>
          </span>
        </p>
      </form>
    </section>
  );
};

export default Registration;
