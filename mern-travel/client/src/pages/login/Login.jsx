import React, { useRef, useContext } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "./LoginAuth.scss";
import Navbar from "../../components/navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";

const inputs = [
  {
    id: 1,
    name: "username",
    type: "username",
    label: "Username",
    placeholder: "abc@xyz.com",
  },
  {
    id: 2,
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "******",
  },
];

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  password: Yup.string()
    .min(3, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const Login = () => {
  const { error, dispatch } = useContext(AuthContext);
  const formikRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const { current: formik } = formikRef;

    console.groupCollapsed("Login Data");
    console.log("Submitting form with these values");
    console.table(formik.values);
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formik.values),
      });

      const data = await res.json(); // wait for the Promise to resolve

      console.log("response: ", data);
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }

    console.groupEnd();
  };

  return (
    <>
      <Navbar />
      <div className="AuthForm">
        <Formik
          innerRef={formikRef}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {}}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="auth-form">
              <div className="form-header">
                <h1>Log In</h1>
              </div>

              <div className="form-body">
                {inputs.map((input) => (
                  <div key={input.id} className="form-group">
                    <label
                      htmlFor={input.name}
                      className={
                        touched[input.name] && errors[input.name]
                          ? "is-invalid-label"
                          : ""
                      }
                    >
                      {input.label}
                    </label>
                    <Field
                      as="input"
                      name={input.name}
                      type={input.type}
                      required={input.required}
                      placeholder={input.placeholder}
                      className={
                        touched[input.name] && errors[input.name]
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                    />
                    {touched[input.name] && errors[input.name] && (
                      <div className="invalid-feedback">
                        {errors[input.name]}
                      </div>
                    )}
                  </div>
                ))}

                {/* <Link className="link" to="/formik-signup">
                SignUp?
              </Link> */}

                <div className="signup-buttons">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                  >
                    LOGIN
                  </button>
                </div>
                {error && <span className="error-msg">{error.message}</span>}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Login;
