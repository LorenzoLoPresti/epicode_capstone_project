import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home/Home.component";
import Login from "../../pages/Login.component";
import ChefPage from "../../pages/Negozio/Negozio.component";
import Shop from "../Shop/Shop.component";
import Checkout from "../../pages/Checkout/Checkout.component";
import NotFound from "../../pages/404/NotFound.component";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/store/:nomeRistorante" element={<ChefPage />} />
      <Route path="/shop/:nomeRistorante" element={<Shop />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
};

export default Router;
