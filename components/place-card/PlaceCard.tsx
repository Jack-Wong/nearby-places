import styles from './PlaceCard.module.css';
import { NearbyPlaceProps } from '../../pages/index';

interface PlaceCardProps {
  place: NearbyPlaceProps;
  idx: number;
}

const PlaceCard = ({ place, idx }: PlaceCardProps) => {
  const { place_id: placeId, name, vicinity, rating } = place;

  return (
    <>
      <div aria-label={name} tabIndex={idx} key={placeId} className={styles.placeCard}>
        <div>
          <p>{name}</p>

          <p>{vicinity}</p>
        </div>

        {rating && (
          <div>
            <p>Rating: {rating} / 5</p>
          </div>
        )}
      </div>
    </>
  )
};

export default PlaceCard;
