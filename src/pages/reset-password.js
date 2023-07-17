import React from "react";
import Form from "../components/form/form";
import page from "./page.module.css";
import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

export default function ResetPasswordPage({ handleResetPasswordSubmit }) {
  const [passwordValue, setPasswordValue] = React.useState("");
  const [codeValue, setCodeValue] = React.useState("");

  const passwordRef = React.useRef();
  const codeRef = React.useRef();

  const onChange = (e) => {
    if (e.target.name === "password") {
      setPasswordValue(e.target.value);
      passwordRef.current = e.target.value;
    } else {
      setCodeValue(e.target.value);
      codeRef.current = e.target.value;
    }
  };

  function handleSubmit() {
    handleResetPasswordSubmit(passwordRef.current, codeRef.current.value);
  }

  return (
    <div className={`${page.page} ${page.pageCenter}`}>
      <Form
        title="Восстановление пароля"
        buttonTitle="Сохранить"
        additional={[
          { text: "Вспомнили пароль?", linkText: "Войти", route: "/login" },
        ]}
        handleSubmitFunc={handleSubmit}
      >
        <PasswordInput
          placeholder="Введите новый пароль"
          onChange={onChange}
          value={passwordValue}
          name={"password"}
          itemRef={passwordRef}
          extraClass="mb-6"
        />

        <Input
          placeholder="Введите код из письма"
          type={"text"}
          onChange={onChange}
          value={codeValue}
          name={"code"}
          ref={codeRef}
          extraClass="mb-6"
        />
      </Form>
    </div>
  );
}

ResetPasswordPage.propTypes = {
  handleResetPasswordSubmit: PropTypes.func.isRequired,
};
