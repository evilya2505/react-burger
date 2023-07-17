import React from "react";
import Form from "../components/form/form";
import page from "./page.module.css";
import {
  EmailInput,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

export default function RegisterPage({ handleRegisterButton }) {
  const [emailValue, setEmailValue] = React.useState("bob@example.com");
  const [passwordValue, setPasswordValue] = React.useState("password");
  const [nameValue, setNameValue] = React.useState("Bob");

  const emailRef = React.useRef("bob@example.com");
  const passwordRef = React.useRef("password");
  const nameRef = React.useRef("Bob");

  const onChange = (e) => {
    switch (e.target.name) {
      case "email":
        setEmailValue(e.target.value);
        emailRef.current = e.target.value;
        break;
      case "password":
        setPasswordValue(e.target.value);
        passwordRef.current = e.target.value;
        break;
      case "name":
        setNameValue(e.target.value);
        nameRef.current = e.target.value;
        break;
      default:
        break;
    }
  };

  function handleSubmit() {
    handleRegisterButton({
      email: emailRef.current,
      password: passwordRef.current,
      name: nameRef.current.value,
    });
  }

  return (
    <div className={`${page.page} ${page.pageCenter}`}>
      <Form
        title="Регистрация"
        buttonTitle="Зарегистрироваться"
        additional={[
          { text: "Уже зарегистрированы?", linkText: "Войти", route: "/login" },
        ]}
        handleSubmitFunc={handleSubmit}
      >
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={onChange}
          value={nameValue}
          name={"name"}
          extraClass="mb-6"
          ref={nameRef}
        />
        <EmailInput
          onChange={onChange}
          value={emailValue}
          itemRef={emailRef}
          name={"email"}
          isIcon={false}
          extraClass="mb-6"
        />

        <PasswordInput
          onChange={onChange}
          value={passwordValue}
          itemRef={passwordRef}
          name={"password"}
          extraClass="mb-6"
        />
      </Form>
    </div>
  );
}

RegisterPage.propTypes = {
  handleRegisterButton: PropTypes.func.isRequired,
};
