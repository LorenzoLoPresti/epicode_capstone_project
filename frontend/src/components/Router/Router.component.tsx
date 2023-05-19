import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home/Home.component";
import Login from "../../pages/Login.component";
import ChefPage from "../../pages/Negozio/Negozio.component";
import Shop from "../Carrello/Shop.component";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={"ErrorPage"} />
      <Route path="/store/:nomeRistorante" element={<ChefPage />} />
      <Route path="/shop/:nomeRistorante" element={<Shop />} />
    </Routes>
  );
};

export default Router;
