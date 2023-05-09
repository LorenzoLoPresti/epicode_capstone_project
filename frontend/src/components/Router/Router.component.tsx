import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home.component";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={"Shop"} />
      <Route path="*" element={"ErrorPage"} />
    </Routes>
  );
};

export default Router;
