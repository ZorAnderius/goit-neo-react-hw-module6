import styles from './NotFound.module.css';

const NotFound = ({ value, children }) => {
  console.log(children);
  return (
    <div className={styles.emptyContainer}>
      {children}
      {!!value && <span className={styles.notFoundValue}>{value}</span>}
    </div>
  );
};

export default NotFound;
