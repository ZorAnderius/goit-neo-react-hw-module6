import styles from './Notification.module.css';

const Notification = ({ children }) => {
  return <div className={styles.notification}>{children}</div>;
};

export default Notification;
