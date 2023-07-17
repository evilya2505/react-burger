import React from "react";
import Form from "../components/form/form";
import page from "./page.module.css";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

export default function ForgotPasswordPage({ handleForgotPasswordSubmit }) {
  const [emailValue, setEmailValue] = React.useState("bob@example.com");
  const emailRef = React.useRef("bob@example.com");

  const onChange = (e) => {
    setEmailValue(e.target.value);
    emailRef.current = e.target.value;
  };

  function handleSubmit() {
    handleForgotPasswordSubmit(emailRef.current);
  }

  return (
    <div className={`${page.page} ${page.pageCenter}`}>
      <Form
        title="Восстановление пароля"
        buttonTitle="Восстановить"
        additional={[
          { text: "Вспомнили пароль?", linkText: "Войти", route: "/login" },
        ]}
        handleSubmitFunc={handleSubmit}
      >
        <EmailInput
          onChange={onChange}
          value={emailValue}
          itemRef={emailRef}
          name={"email"}
          isIcon={false}
          extraClass="mb-6"
        />
      </Form>
    </div>
  );
}

ForgotPasswordPage.propTypes = {
  handleForgotPasswordSubmit: PropTypes.func.isRequired,
};
