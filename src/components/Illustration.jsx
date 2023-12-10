import signupImg from "../assets/images/signup.svg";
import classes from "../styles/Illustration.module.css";

export default function Illustration() {
  return (
    <div className={classes.illustration}>
      <img src={signupImg} alt="Signup" />
    </div>
  );
}
