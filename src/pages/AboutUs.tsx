import {Helmet} from "react-helmet-async";
import {Card} from "react-bootstrap";
import '../styles/AboutUs.css'

export function AboutUs() {
    return (
        <>
            <Helmet>
                <title>O nás</title>
            </Helmet>
            <Card className="about-us-card">
                <h3 className="mb-3">Kto sme?</h3>
                <p>Táto webová aplikácia ASOS E-shop je fiktívny e-shop, ktorý bol vytvorený v rámci predmetu
                Architektúra softvérových systémov (ASOS) v ZS 2. ročníku ING na FEI STU. </p>
                <p>Frontendová časť aplikácie bola vytvorená vo frameworku React a z členov tímu na vývoji podieľali
                Bc. Miroslav Malíšek a Bc. Peter Kopecký.</p>
                <p>Backendová časť aplikácie bola vytvorená vo frameworku Laravel a z členov tímu na vývoji podieľali
                Bc. Michal Vrbovský, Bc. Adela Radičová a Bc. Richard Körösi.</p>
            </Card>
        </>

    );
}