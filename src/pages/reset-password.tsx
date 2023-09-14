import React, { ChangeEvent } from "react";
import Form from "../components/form/form";
import page from "./page.module.css";
import {
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
interface IResetPasswordPageProps {
  handleResetPasswordSubmit: (password: string, code: string) => void;
}

const ResetPasswordPage: React.FC<IResetPasswordPageProps> = ({
  handleResetPasswordSubmit,
}: IResetPasswordPageProps): JSX.Element => {
  const [passwordValue, setPasswordValue] = React.useState<string>("");
  const [codeValue, setCodeValue] = React.useState<string>("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "password") {
      setPasswordValue(e.target.value);
    } else {
      setCodeValue(e.target.value);
    }
  };

  function handleSubmit() {
    handleResetPasswordSubmit(passwordValue, codeValue);
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
          extraClass="mb-6"
        />

        <Input
          placeholder="Введите код из письма"
          type={"text"}
          onChange={onChange}
          value={codeValue}
          name={"code"}
          extraClass="mb-6"
        />
      </Form>
    </div>
  );
};

ResetPasswordPage.propTypes = {
  handleResetPasswordSubmit: PropTypes.func.isRequired,
};

export default ResetPasswordPage;
