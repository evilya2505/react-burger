import React, { ChangeEvent } from "react";
import {
  EmailInput,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Form from "../form/form";
import { TUserInfo } from "../../services/types/data";
import { useSelector } from "../../services/hooks";

interface IUserProfileProps {
  editUserInfo: (newUserInfoObj: TUserInfo) => void;
}

const UserProfile: React.FC<IUserProfileProps> = ({
  editUserInfo,
}: IUserProfileProps): JSX.Element => {
  const userInfo = useSelector((store) => store.auth.userInfo);
  const [emailValue, setEmailValue] = React.useState<string>(userInfo.email);
  const [passwordValue, setPasswordValue] = React.useState<string>("");
  const [nameValue, setNameValue] = React.useState<string>(userInfo.name);

  const nameRef = React.useRef<HTMLInputElement>(null);
  const [isAllowNameEditing, setIsAllowNameEditing] =
    React.useState<boolean>(false);

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
        if (nameRef.current) {
          nameRef.current.value = e.target.value;
        }
        break;
      default:
        break;
    }
  };

  function handleSubmit() {
    editUserInfo({
      email: emailValue,
      name: nameValue,
      password: passwordValue,
    });
  }

  function handleIconClick() {
    setIsAllowNameEditing(true);
  }

  React.useEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus();
    }
  }, [isAllowNameEditing]);

  return (
    <div className="mt-30">
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
          name={"email"}
          isIcon={true}
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={onChange}
          value={passwordValue}
          name={"password"}
          icon="EditIcon"
          extraClass="mb-6"
        />
      </Form>
    </div>
  );
};

export default UserProfile;
