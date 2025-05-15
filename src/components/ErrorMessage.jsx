import styles from './ErrorMessage.module.css';

const ErrorMessage = ({ message }) => {
  return <div className={styles.error}>{message || 'Ooops! There was an error.'}</div>;
};

export default ErrorMessage;
