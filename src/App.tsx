import MainLayout from './layouts/MainLayout';
import { HelmetProvider } from 'react-helmet-async';
import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home.tsx";
import {AboutUs} from "./pages/AboutUs.tsx";
import {Contact} from "./pages/Contact.tsx";
import {Login} from "./pages/Login.tsx";
import {Logout} from "./pages/Logout.tsx";
import {UserProfile} from "./pages/UserProfile.tsx";
import {UserOrders} from "./pages/UserOrders.tsx";
import { Register } from './pages/Register.tsx';
import {Product} from "./pages/Product.tsx";

function App() {

  return (
      <>
          <HelmetProvider>
              <MainLayout>
                  <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/product/:id" element={<Product />} />
                      <Route path="/about-us" element={<AboutUs />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/register" element={<Register/>}/>
                      <Route path="/login" element={<Login />} />
                      <Route path="/logout" element={<Logout />} />
                      <Route path="/profile" element={<UserProfile />} />
                      <Route path="/orders" element={<UserOrders />} />
                  </Routes>
              </MainLayout>
          </HelmetProvider>
      </>

  )
}

export default App
