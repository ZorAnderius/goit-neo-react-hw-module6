import styles from './Button.module.css';

const Button = ({ handleClick, children, type = 'button', style }) => {
  return (
    <button className={styles[style]} type={type} onClick={() => handleClick()}>
      <span>{children}</span>
    </button>
  );
};

export default Button;
