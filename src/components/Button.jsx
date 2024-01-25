import classes from "../styles/Button.module.css";

// eslint-disable-next-line react/prop-types
export default function Button({ className, children, ...rest }) {
  return (
    <button className={`${classes.button} ${className}`} {...rest}>
      {children}
    </button>
  );
}
