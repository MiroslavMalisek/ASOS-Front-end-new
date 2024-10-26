import {Helmet} from "react-helmet-async";
import { useState } from "react";
import {AdvancedMarker, APIProvider, Map} from "@vis.gl/react-google-maps";
import '../styles/Contact.css'
import {Card} from "react-bootstrap";

export function Contact() {

    const [markerLocationFeiStu] = useState({
        lat: 48.151996327767264,
        lng: 17.07337678374235,
    });
    return (
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <Helmet>
                <title>Kontakt</title>
            </Helmet>
            <Card className="contact-card">
                <div className="contact-row">
                    <div className="contact-info col-12 col-lg-4">
                        <h3 className="mb-3">Kontaktné informácie</h3>
                        <h5>ASOS E-shop s.r.o</h5>
                        <p>Fakulta elektrotechniky a informatiky STU</p>
                        <p>Ilkovičova 3</p>
                        <p>841 04 Bratislava</p>
                        <div className="contact-container">
                            <h6 className="my-0">Telefónne číslo: </h6>
                            <p className="my-0 mx-2">+421999999999</p>
                        </div>
                        <div className="contact-container">
                            <h6 className="my-0">Email: </h6>
                            <p className="my-0 mx-2">example@example.com</p>
                        </div>
                        <div className="opening-hours">
                            <h6>Otváracie hodiny:</h6>
                            <p>Pondelok - Piatok : 10:00 - 18:00</p>
                            <p>Sobota: 10:00 - 14:00</p>
                            <p>Nedeľa: Zatvorené</p>
                        </div>
                    </div>
                    <div className="map-container col-12 col-lg-8">
                        <Map mapId='DEMO_MAP_ID' defaultZoom={15} defaultCenter={markerLocationFeiStu}>
                        <AdvancedMarker position={markerLocationFeiStu}/>
                        </Map>
                    </div>
                </div>
            </Card>
        </APIProvider>
    );
}

