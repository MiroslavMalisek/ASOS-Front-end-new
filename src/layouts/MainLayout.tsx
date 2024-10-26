import Navbar from "../components/navbar/Navbar.tsx";
import { Card, Container } from "react-bootstrap";
import React from "react";
import './MainLayout.css'

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container className="layout-container mb-5">
        <Card /*style={{ border: "none" }}*/>{children}</Card>
      </Container>
    </>
  );
};

export default MainLayout;
