import styles from "./Register.module.scss";
import Input from "@components/ui/Input";
import { Link } from "react-router";
import UserICO from "@assets/images/icons/user.svg?react";
import PasswordICO from "@assets/images/icons/password.svg?react";
import VkICO from "@assets/images/icons/vk.svg?react";
import FacebookICO from "@assets/images/icons/facebook.svg?react";
import AppleICO from "@assets/images/icons/apple.svg?react";
import GoogleICO from "@assets/images/icons/google.svg?react";

const Index = () => {
  return (
    <section className={styles.registration}>
      <form>
        <h1>Registration</h1>
        <div className={styles.registration__inputs}>
          <Input Icon={UserICO} placeholder="Login / Email" />
          <Input Icon={PasswordICO} placeholder="Password" type={"password"} />
        </div>
        <div className={styles.registration__oauth}>
          <VkICO />
          <FacebookICO />
          <AppleICO />
          <GoogleICO />
        </div>
        <Input
          type="button"
          className={styles.registration__button}
          value="Register"
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

export default Index;
