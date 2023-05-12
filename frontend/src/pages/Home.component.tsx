import HomeBody from "../components/HomeBody/HomeBody.component";
import Jumbotron from "../components/Jumbotron/Jumbotron.component";
import { useAppSelector } from "../redux/store/store";
// import { useEffect } from "react";

const Home = () => {
  const reduxToken = useAppSelector((state) => state.authToken?.token);

  return (
    <div>
      <>
        {!reduxToken && (
          <>
            <Jumbotron />
            <HomeBody />
          </>
        )}
      </>
    </div>
  );
};

export default Home;
