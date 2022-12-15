import { useState, SyntheticEvent, useMemo } from 'react';
import styles from './index.module.css';
import axios from 'axios';

import PlaceCard from '../components/place-card/PlaceCard';
import PlaceCardLoading from '../components/place-card-loading/PlaceCardLoading';
import { locations, authToken } from '../constants';

interface LocationProps {
  name: string;
  coordinates: string;
}

export interface NearbyPlaceProps {
  place_id: string;
  name: string;
  vicinity: string;
  rating?: number;
}

const App = () => {
  const [selectedLocation, setSelectedLocation] = useState<LocationProps>({} as LocationProps);
  const [keyword, setKeyword] = useState('');
  const [nearbyPlaces, setNearbyPlaces] = useState<NearbyPlaceProps[]>([]);
  const [showNoResults, setShowNoResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (event: SyntheticEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setShowNoResults(false);
    const params = {
      location: selectedLocation.coordinates,
      radius: 1500,
      keyword: keyword,
      key: authToken,
    };

    try {
      const places = await axios.get('/api/places', {
        params: params
      });
      if (!places.data.results.length) {
        setShowNoResults(true);
      } else {
        setNearbyPlaces(places.data.results);
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  }

  const renderRadioInputs = (location: LocationProps) => (
    <label key={location.name}>
      <input type="radio" checked={selectedLocation.name === location.name} onChange={() => setSelectedLocation(location)} />

      {location.name}
    </label>
  );

  const getLoadingCards = useMemo(() => {
    const loadingCards = [];
    for (let i = 0; i < 5; i++) {
      loadingCards.push(<PlaceCardLoading key={i} />)
    }

    return loadingCards;
  }, [])

  const renderResults = () => {
    if (isLoading) {
      return (
        getLoadingCards.map(card => card)
      )
    }
    if (showNoResults) {
      return (
        <h3 aria-label="No Results" tabIndex={0}>No Results</h3>
      )
    }

    return (
      nearbyPlaces.map((place, idx) => (
        <PlaceCard key={place.place_id} place={place} idx={idx} />
      ))
    )
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSearch} className={styles.form}>
        <div className={styles.locationWrapper}>
          <p aria-label="Select a location" tabIndex={0}>Select a Location</p>

          <div className={styles.locationRadioWrapper}>
            <div className={styles.leftRadioSection}>
              {locations.slice(0, 3).map(location => renderRadioInputs(location))}
            </div>

            <div className={styles.rightRadioSection}>
              {locations.slice(3, 5).map(location => renderRadioInputs(location))}
            </div>
          </div>
        </div>

        <div className={styles.searchWrapper}>
          <label>
            <p>
              Search
            </p>

            <input type="text" value={keyword} onChange={(event) => setKeyword(event.target.value)} />
          </label>

          <button type="submit" disabled={!selectedLocation.coordinates} className={styles.searchButton} onClick={handleSearch}>Search</button>
        </div>
      </form>

      <div>
        {renderResults()}
      </div>
    </div>
  );
}

export default App;
