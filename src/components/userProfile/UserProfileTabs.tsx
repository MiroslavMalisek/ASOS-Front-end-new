import {Tab, Tabs} from "react-bootstrap";
import './UserProfileTabs.css'
import UserProfileDataForm from "./UserProfileDataForm.tsx";

import UserProfileNewPasswordForm from "./UserProfileNewPasswordForm.tsx";


const UserProfileTabs = () => {

    return (
        <Tabs defaultActiveKey="personal-data" className="tabs mb-3 px-4">
            <Tab eventKey="personal-data" title="Moje údaje" className="user-profile-tab mx-3">
                <UserProfileDataForm />
            </Tab>
            <Tab eventKey="password-change" title="Zmena hesla" className="user-profile-tab">
                <UserProfileNewPasswordForm />
            </Tab>
        </Tabs>
    );
};

export default UserProfileTabs;