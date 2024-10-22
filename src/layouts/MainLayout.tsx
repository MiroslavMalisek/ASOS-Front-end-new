
import Navbar from "../components/navbar/Navbar.tsx";
import {Card, Container} from "react-bootstrap";
import React from "react";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <><Navbar/>
            <Container>
                <Card className='mt-5 text-center'>
                    {children}
                </Card>
            </Container>
        </>
    )
}

export default MainLayout;