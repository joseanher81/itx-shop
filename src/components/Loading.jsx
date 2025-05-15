import styles from './Loading.module.css';

const Loading = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.spinner} />
      <span>Loading...</span>
    </div>
  );
};

export default Loading;
