import styles from "./Login.module.scss";
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

    if (name === 'email') setEmail(value)
    if (name === 'password') setPassword(value)
  }

  const onSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await signIn(email, password);

    } catch (error: any) {
        console.error("Ошибка при авторизации", error.message);
      }
  }

  useEffect(() => {
    if (user) {
      navigate(`/profile/${user.user_metadata.login}`);
    }
  }, [user, navigate]);

  return (
    <section className={styles.login}>
      <form onSubmit={onSubmitHandler}>
        <h1>Sign in</h1>
        <div className={styles.login__inputs}>
          <Input Icon={UserICO} placeholder="Email" type='email' value={email} name='email' onChange={(event) => onChangeHandler(event)}/>
          <Input Icon={PasswordICO} placeholder="Password" type="password" value={password} name='password' onChange={(event) => onChangeHandler(event)} />
        </div>
        <div className={styles.login__oauth}>
          <VkICO />
          <FacebookICO />
          <AppleICO />
          <GoogleICO />
        </div>
        <Input type="submit" className={styles.login__button} value="Sign in" />
        <p className={styles.login__registration}>
          Don't have an account yet?{" "}
          <span>
            <Link to={"/registration"}>Registration</Link>
          </span>
        </p>
      </form>
    </section>
  );
};

export default Login;
