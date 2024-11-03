import MainLayout from './layouts/MainLayout';
import { HelmetProvider } from 'react-helmet-async';
import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home.tsx";
import {AboutUs} from "./pages/AboutUs.tsx";
import {Contact} from "./pages/Contact.tsx";
import {Login} from "./pages/Login.tsx";
import {Cart} from "./pages/Cart.tsx";
import {UserProfile} from "./pages/UserProfile.tsx";
import {UserOrders} from "./pages/UserOrders.tsx";
import { Register } from './pages/Register.tsx';
import {Product} from "./pages/Product.tsx";
import {AuthProvider} from "./contexts/authentication/AuthContext.tsx";

import { PrimeReactProvider } from 'primereact/api';

import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import {ProductsByCategory} from "./pages/ProductsByCategory.tsx";

function App() {

  return (
      <>
          <AuthProvider>
              <HelmetProvider>
                  <PrimeReactProvider>
                      <MainLayout>
                          <Routes>
                              <Route path="/" element={<Home />} />
                              <Route path="/:categoryName" element={<ProductsByCategory />} />
                              <Route path="/product/:id" element={<Product />} />
                              <Route path="/about-us" element={<AboutUs />} />
                              <Route path="/contact" element={<Contact />} />
                              <Route path="/register" element={<Register/>}/>
                              <Route path="/login" element={<Login />} />
                              <Route path="/profile" element={<UserProfile />} />
                              <Route path="/orders" element={<UserOrders />} />
                              <Route path="/cart" element={<Cart />} />
                          </Routes>
                      </MainLayout>
                  </PrimeReactProvider>
              </HelmetProvider>
          </AuthProvider>
      </>

  )
}

export default App
