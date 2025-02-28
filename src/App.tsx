import MainLayout from "./layouts/MainLayout";
import { HelmetProvider } from "react-helmet-async";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home.tsx";
import { AboutUs } from "./pages/AboutUs.tsx";
import { Contact } from "./pages/Contact.tsx";
import { Login } from "./pages/Login.tsx";
import { Cart } from "./pages/Cart.tsx";
import { UserProfile } from "./pages/UserProfile.tsx";
import { UserOrders } from "./pages/UserOrders.tsx";
import { Register } from "./pages/Register.tsx";
import { Product } from "./pages/Product.tsx";
import { AuthProvider } from "./contexts/authentication/AuthContext.tsx";

import { PrimeReactProvider } from "primereact/api";

import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { ProductsByCategory } from "./pages/ProductsByCategory.tsx";
import { ShoppingCartProvider } from "./contexts/shoppingCart/ShoppingCartContext.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";

function App() {
  return (
    <>
      <ShoppingCartProvider>
        <AuthProvider>
          <HelmetProvider>
            <PrimeReactProvider>
              <MainLayout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route
                    path="/:categoryName"
                    element={<ProductsByCategory />}
                  />
                  <Route path="/product/:id" element={<Product />} />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/register" element={<Register />}/>
                  <Route path="/login" element={<Login />} />
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <UserProfile />
                    </ProtectedRoute>
                  } />
                  <Route path="/orders" element={
                    <ProtectedRoute>
                      <UserOrders />
                    </ProtectedRoute>
                  } />
                  <Route path="/cart" element={<Cart />} />
                </Routes>
              </MainLayout>
            </PrimeReactProvider>
          </HelmetProvider>
        </AuthProvider>
      </ShoppingCartProvider>
    </>
  );
}

export default App;
