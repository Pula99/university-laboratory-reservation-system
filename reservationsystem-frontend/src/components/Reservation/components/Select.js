
import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import "../../../App.css"


function Select(props) {
  const { label, name, options, ...rest } = props;
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <Field as="select" id={name} name={name} {...rest}>
        {/* Add an initial null option */}
        <option key="Select Chemical" value= "Select Chemical"> Select an option </option>
        {/* Map over the options array */}
        {options.map((option, index) => {
          return (
            <option key={index} value={option.value}>
              {option.key}
            </option>
          );
        })}
      </Field>
      <ErrorMessage name={name} component={TextError}/>
    </div>
  );
}

export default Select;
