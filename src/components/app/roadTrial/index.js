import { useEffect } from 'react';
import WithPageHandler from 'components/layouts/pageHandler';

// eslint-disable-next-line no-unused-vars
const promise = new Promise((resolve) => {
  setTimeout(() => resolve(), 1000);
});

const RoadTrial = ({
  pageState,
  setPageState,
}) => {
  const onFetchData = async () => {
    try {
      await promise;
      setPageState('loaded');
    } catch (error) {
      setPageState('error');
    }
  };

  useEffect(() => {
    onFetchData();
  }, []);

  // return null during page loading or data fetching error
  if (pageState === 'loading' || pageState === 'error') return null;
  return (
    <span className="font-quicksand-semi-bold" style={{ fontSize: '16px' }}>
      Road Trial: Cars For Jama
    </span>
  );
};

export default WithPageHandler(RoadTrial);
