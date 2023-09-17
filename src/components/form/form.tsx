import React, { ReactNode } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import form from "./form.module.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
interface IFormProps {
  children: ReactNode;
  handleSubmitFunc: () => void;
  title?: string;
  buttonTitle: string;
  additional?: Array<{
    text: string;
    route: string;
    linkText: string;
  }>;
}

const Form: React.FC<IFormProps> = ({
  children,
  handleSubmitFunc,
  title,
  buttonTitle,
  additional,
}: IFormProps) => {
  const handleSubmit = React.useCallback(
    (e: React.FormEvent | KeyboardEvent) => {
      e.preventDefault();

      handleSubmitFunc();
    },
    [handleSubmitFunc]
  );

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.keyCode === 13) {
        handleSubmit(e);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [handleSubmit]);

  return (
    <form className={form.form} onSubmit={handleSubmit}>
      {title && (
        <h1 className={`text text_type_main-medium ${form.title}`}>{title}</h1>
      )}

      <fieldset className={form.fieldset}>
        {children}
        <div className={`${form.buttom} mb-20`}>
          <Button
            htmlType="button"
            type="primary"
            size="medium"
          >
            {buttonTitle}
          </Button>
        </div>
        <ul className={form.additional}>
          {additional?.map((item, index) => {
            return (
              <li key={index} className={form.listItem}>
                <p className="text text_type_main-default text_color_inactive">
                  {item.text}
                </p>
                <Link to={item.route}>
                  <Button
                    extraClass="pl-2"
                    htmlType="button"
                    type="secondary"
                    size="medium"
                  >
                    {item.linkText}
                  </Button>
                </Link>
              </li>
            );
          })}
        </ul>
      </fieldset>
    </form>
  );
};

Form.propTypes = {
  children: PropTypes.node.isRequired,
  handleSubmitFunc: PropTypes.func.isRequired,
  title: PropTypes.string,
  buttonTitle: PropTypes.string.isRequired,
  additional: PropTypes.array,
};

export default Form;
