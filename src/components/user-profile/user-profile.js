import React from "react";
import {
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import Form from "../../components/form/form";
import PropTypes from "prop-types";

export default function UserProfile({ editUserInfo }) {
  const userInfo = useSelector((store) => store.auth.userInfo);
  const [emailValue, setEmailValue] = React.useState(userInfo.email);
  const [passwordValue, setPasswordValue] = React.useState("");
  const [nameValue, setNameValue] = React.useState(userInfo.name);
  const emailRef = React.useRef(userInfo.email);
  const passwordRef = React.useRef("");
  const nameRef = React.useRef(userInfo.name);
  const [isAllowNameEditing, setIsAllowNameEditing] = React.useState(false);

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
    editUserInfo({
      email: emailRef.current,
      name: nameRef.current.value,
      password: passwordRef.current,
    });
  }

  function handleIconClick() {
    setIsAllowNameEditing(true);
  }

  React.useEffect(() => {
    nameRef.current.focus();
  }, [isAllowNameEditing]);

  return (
    <Form buttonTitle="Сохранить" handleSubmitFunc={handleSubmit}>
      <Input
        type={"text"}
        onChange={onChange}
        value={nameValue}
        ref={nameRef}
        name={"name"}
        placeholder="Логин"
        icon={"EditIcon"}
        extraClass="mb-6"
        disabled={!isAllowNameEditing}
        onIconClick={handleIconClick}
        onBlur={() => setIsAllowNameEditing(false)}
      />
      <EmailInput
        onChange={onChange}
        value={emailValue}
        itemRef={emailRef}
        name={"email"}
        isIcon={true}
        icon="EditIcon"
        extraClass="mb-6"
      />
      <PasswordInput
        onChange={onChange}
        value={passwordValue}
        itemRef={passwordRef}
        name={"password"}
        icon="EditIcon"
        extraClass="mb-6"
      />
    </Form>
  );
}

UserProfile.propTypes = {
  editUserInfo: PropTypes.func.isRequired,
};
