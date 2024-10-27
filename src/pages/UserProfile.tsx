import {Helmet} from "react-helmet-async";
import {Container} from "react-bootstrap";
import UserProfileTabs from "../components/userProfile/UserProfileTabs.tsx";
import {UserData} from "../components/userProfile/UserProfileDataProp.ts";

export function UserProfile() {
    const data: UserData = {first_name: "Miroslav", last_name: "Malisek", email: "example@ex.com",
        phone: "+421915076851", address: "Kvetná 8, 82108, Bratislava, Slovensko"}

    return (
        <>
            <Helmet>
                <title>Môj profil</title>
            </Helmet>
            <Container className="p-3">
                <h3 className="mb-4">Môj profil</h3>
                <UserProfileTabs userData={data} />
            </Container>
        </>
    );
}