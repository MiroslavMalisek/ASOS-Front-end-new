import Navbar from "../components/navbar/Navbar.tsx";
import { Card, Container } from "react-bootstrap";
import React from "react";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container
        className="mb-5"
        style={{
          marginTop: "120px",
          borderRadius: "0.5rem",
          position: "relative"
        }}
      >
        <Card style={{ border: "none" }}>{children}</Card>
      </Container>
    </>
  );
};

export default MainLayout;
