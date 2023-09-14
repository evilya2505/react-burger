import React, { ChangeEvent } from "react";
import Form from "../components/form/form";
import page from "./page.module.css";
import {
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

interface ILoginPageProps {
  handleLoginButton: (userData: { email: string; password: string }) => void;
}

const LoginPage: React.FC<ILoginPageProps> = ({
  handleLoginButton,
}: ILoginPageProps): JSX.Element => {
  const [emailValue, setEmailValue] = React.useState("bob@example.com");
  const [passwordValue, setPasswordValue] = React.useState("password");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "email") {
      setEmailValue(e.target.value);
    } else {
      setPasswordValue(e.target.value);
    }
  };

  function handleSubmit() {
    handleLoginButton({
      email: emailValue,
      password: passwordValue,
    });
  }

  return (
    <div className={`${page.page} ${page.pageCenter}`}>
      <Form
        title="Вход"
        buttonTitle="Войти"
        additional={[
          {
            text: `Вы\u00A0—\u00A0новый\u00A0пользователь?`,
            linkText: "Зарегистрироваться",
            route: "/register",
          },
          {
            text: "Забыли пароль?",
            linkText: "Восстановить пароль",
            route: "/forgot-password",
          },
        ]}
        handleSubmitFunc={handleSubmit}
      >
        <EmailInput
          onChange={onChange}
          name={"email"}
          isIcon={false}
          extraClass="mb-6"
          value={emailValue}
        />

        <PasswordInput
          onChange={onChange}
          name={"password"}
          extraClass="mb-6"
          value={passwordValue}
        />
      </Form>
    </div>
  );
};

LoginPage.propTypes = {
  handleLoginButton: PropTypes.func.isRequired,
};

export default LoginPage;
