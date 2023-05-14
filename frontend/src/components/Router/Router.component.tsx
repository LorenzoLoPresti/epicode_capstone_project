import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home/Home.component";
import Login from "../../pages/Login.component";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/shop" element={"Shop"} />
      <Route path="*" element={"ErrorPage"} />
    </Routes>
  );
};

export default Router;
