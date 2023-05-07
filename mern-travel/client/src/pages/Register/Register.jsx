import React, { useRef, useContext } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
// import "./LoginAuth.scss";

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
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "abc@xyz.com",
  },
  {
    id: 3,
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "******",
  },
  {
    id: 4,
    name: "confirmPassword",
    type: "confirmPassword",
    label: "Confirm Password",
    placeholder: "******",
  },
];

const initialValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Name is required"),
  password: Yup.string()
    .min(3, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const Register = () => {
  const { error } = useContext(AuthContext);
  const formikRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const { current: formik } = formikRef;

    console.groupCollapsed("Login Data");
    console.log("Submitting form with these values");
    const { confirmPassword, ...payload } = formik.values;
    console.table(payload);
    console.groupEnd();
    try {
      const res = await axios.post("/auth/register", payload);

      const data = res.data; // Get the response data from the Axios response object

      console.log("response: ", data);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
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
                <h1>Sign Up</h1>
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
                    onClick={handleSubmit}
                  >
                    REGISTER
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

export default Register;
