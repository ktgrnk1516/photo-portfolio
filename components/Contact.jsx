import React, { useContext, useRef } from "react";
import classes from "./Contact.module.scss";
import emailjs from "@emailjs/browser";
// import { ThemeContext } from "../../context";

const Contact = () => {
  // const theme = useContext(ThemeContext);
  // const darkMode = theme.state.darkMode;

  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_95usxzg",
        "template_srxwzih",
        formRef.current,
        "9ei1pmo5abZuW9Ik2"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className={classes.root}>
      <div className={classes.c}>
        {/* <div className={classes.c_bg}></div> */}
        <div className={classes.c_wrapper}>
          <div className={classes.c_right}>
            <div className={classes.toiawase}>
              <p className={classes.c_desc}>
                <b></b> お気軽にお問い合わせください。
              </p>
            </div>

            <form ref={formRef} onSubmit={handleSubmit}>
              <input
                // style={{ background: darkMode && "#444" }}
                type="text"
                placeholder="Name"
                name="user_name"
              />
              <input
                // style={{ background: darkMode && "#444" }}
                type="text"
                placeholder="Subject"
                name="user_subject"
              />
              <input
                // style={{ background: darkMode && "#444" }}
                type="text"
                placeholder="Email"
                name="user_email"
              />
              <textarea
                // style={{ background: darkMode && "#444" }}
                name="message"
                id=""
                cols="30"
                rows="5"
                placeholder="Message"
              ></textarea>
              <div className={classes.button_wrapper}>
                <button>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
