import {Helmet} from "react-helmet-async";
import {Container} from "react-bootstrap";
import UserProfileTabs from "../components/userProfile/UserProfileTabs.tsx";

export function UserProfile() {
    return (
        <>
            <Helmet>
                <title>Môj profil</title>
            </Helmet>
            <Container className="p-3">
                <h3 className="mb-4">Môj profil</h3>
                <UserProfileTabs />
            </Container>
        </>
    );
}