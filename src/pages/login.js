import React from "react";
import Form from "../components/form/form";
import page from "./page.module.css";
import {
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

export default function LoginPage({ handleLoginButton }) {
  const [emailValue, setEmailValue] = React.useState("bob@example.com");
  const [passwordValue, setPasswordValue] = React.useState("password");

  const emailRef = React.useRef("bob@example.com");
  const passwordRef = React.useRef("password");

  const onChange = (e) => {
    if (e.target.name === "email") {
      setEmailValue(e.target.value);
      emailRef.current = e.target.value;
    } else {
      setPasswordValue(e.target.value);
      passwordRef.current = e.target.value;
    }
  };

  function handleSubmit() {
    console.log(emailRef.current, passwordRef.current);
    handleLoginButton({
      email: emailRef.current,
      password: passwordRef.current,
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
          itemRef={emailRef}
          name={"email"}
          isIcon={false}
          extraClass="mb-6"
          value={emailValue}
        />

        <PasswordInput
          onChange={onChange}
          itemRef={passwordRef}
          name={"password"}
          extraClass="mb-6"
          value={passwordValue}
        />
      </Form>
    </div>
  );
}

LoginPage.propTypes = {
  handleLoginButton: PropTypes.func.isRequired,
};
