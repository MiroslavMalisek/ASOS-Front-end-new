import MainLayout from './layouts/MainLayout';
import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home.tsx";
import {AboutUs} from "./pages/AboutUs.tsx";
import {Contact} from "./pages/Contact.tsx";
import {Login} from "./pages/Login.tsx";
import {Logout} from "./pages/Logout.tsx";
import {UserProfile} from "./pages/UserProfile.tsx";
import {UserOrders} from "./pages/UserOrders.tsx";

function App() {

  return (
      <>
          <MainLayout>
          </MainLayout>

          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/orders" element={<UserOrders />} />
          </Routes>
      </>

  )
}

export default App
