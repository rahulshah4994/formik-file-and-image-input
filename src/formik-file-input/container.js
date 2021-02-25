import React, { useCallback } from "react";
import { useFormikContext } from "formik";

import FileInput from "./component";

const FileInputContainer = ({
  component: Component,
  className,
  validFormats,
  name,
  hideName,
  hideError,
  hideDelete,
}) => {
  const {
    values,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    setFieldError,
  } = useFormikContext();

  const isFileValid = useCallback(
    (file) => {
      if (!validFormats.includes(file.type)) {
        setFieldValue(name, null);
        setTimeout(() => {
          setFieldError(
            name,
            `Invalid file format. Accepted formats are ${validFormats.join(
              ", "
            )}`
          );
        }, 0);
        return false;
      }
      return true;
    },
    [validFormats]
  );

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFieldTouched(name, true);
    if (isFileValid(file)) {
      setFieldValue(name, file);
      setFieldError(name, null);
    }
  };

  const handleFileDelete = useCallback(() => {
    setFieldValue(name, null);
    setFieldError(name, null);
  }, []);

  const fileInputProps = {
    InputComponent: Component,
    className,
    handleChange: handleFileUpload,
    fileName: values[name]?.name,
  };

  return (
    <>
      <FileInput {...fileInputProps} />
      {!hideName && <p>{values[name]?.name}</p>}
      {!hideError && touched[name] && <p>{errors[name]}</p>}
      {!hideDelete && (
        <button type="button" onClick={handleFileDelete}>
          Delete
        </button>
      )}
    </>
  );
};

export default FileInputContainer;
