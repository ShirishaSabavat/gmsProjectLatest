import { useEffect } from "react";
import WithPageHandler from "components/layouts/pageHandler";

// eslint-disable-next-line no-unused-vars
const promise = new Promise((resolve) => {
  setTimeout(() => resolve(), 1000);
});

const Dashboard = ({
  pageState,
  setPageState,
}) => {
  const onFetchData = async () => {
    try {
      await promise;
      setPageState("loaded");
    } catch (error) {
      setPageState("error");
    }
  };

  useEffect(() => {
    onFetchData();
  }, []);

  // return null during page loading or data fetching error
  if (pageState === "loading" || pageState === "error") return null;
  return (
    <span>
      Dashboard Page
    </span>
  );
};

export default WithPageHandler(Dashboard);
