import React, { ChangeEvent } from "react";
import Form from "../components/form/form";
import page from "./page.module.css";
import {
  EmailInput,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { TUserInfo } from "../services/types/data";

interface IRegisterPageProps {
  handleRegisterButton: (userData: TUserInfo) => void;
}

const RegisterPage: React.FC<IRegisterPageProps> = ({
  handleRegisterButton,
}: IRegisterPageProps): JSX.Element => {
  const [emailValue, setEmailValue] = React.useState<string>("bob@example.com");
  const [passwordValue, setPasswordValue] = React.useState<string>("password");
  const [nameValue, setNameValue] = React.useState<string>("Bob");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "email":
        setEmailValue(e.target.value);
        break;
      case "password":
        setPasswordValue(e.target.value);
        break;
      case "name":
        setNameValue(e.target.value);
        break;
      default:
        break;
    }
  };

  function handleSubmit() {
    handleRegisterButton({
      email: emailValue,
      password: passwordValue,
      name: nameValue,
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
        />
        <EmailInput
          onChange={onChange}
          value={emailValue}
          name={"email"}
          isIcon={false}
          extraClass="mb-6"
        />

        <PasswordInput
          onChange={onChange}
          value={passwordValue}
          name={"password"}
          extraClass="mb-6"
        />
      </Form>
    </div>
  );
};

RegisterPage.propTypes = {
  handleRegisterButton: PropTypes.func.isRequired,
};

export default RegisterPage;
