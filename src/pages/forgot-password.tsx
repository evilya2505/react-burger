import React, { ChangeEvent } from "react";
import Form from "../components/form/form";
import page from "./page.module.css";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
interface IForgotPasswordPageProps {
  handleForgotPasswordSubmit: (email: string) => void;
}

const ForgotPasswordPage: React.FC<IForgotPasswordPageProps> = ({
  handleForgotPasswordSubmit,
}: IForgotPasswordPageProps): JSX.Element => {
  const [emailValue, setEmailValue] = React.useState<string>("bob@example.com");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };

  function handleSubmit() {
    handleForgotPasswordSubmit(emailValue);
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
          name={"email"}
          isIcon={false}
          extraClass="mb-6"
        />
      </Form>
    </div>
  );
};

ForgotPasswordPage.propTypes = {
  handleForgotPasswordSubmit: PropTypes.func.isRequired,
};

export default ForgotPasswordPage;
