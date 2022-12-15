import styles from './PlaceCardLoading.module.css';

const PlaceCardLoading = () => (
  <div className={styles.loadingCard}>
    <div>
      <div className={styles.loading} />
      <br />
      <div className={styles.loading} />
    </div>

    <div>
      <div className={styles.loading}/>
    </div>
  </div>
);

export default PlaceCardLoading;
