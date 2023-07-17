import React from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import form from "./form.module.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function Form({ children, handleSubmitFunc, title, buttonTitle, additional }) {
  const handleSubmit = React.useCallback(
    (e) => {
      e.preventDefault();

      handleSubmitFunc();
    },
    [handleSubmitFunc]
  );

  React.useEffect(() => {
    const onKeyDown = (e) => {
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
    <form className={form.form}>
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
            onClick={handleSubmit}
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
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
  handleSubmitFunc: PropTypes.func.isRequired,
  title: PropTypes.string,
  buttonTitle: PropTypes.string.isRequired,
  additional: PropTypes.array,
};

export default Form;
