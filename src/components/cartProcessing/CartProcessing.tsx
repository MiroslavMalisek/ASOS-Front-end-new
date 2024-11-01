import React, {useEffect, useRef} from "react";
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import "./CartProcessing.css"

export default function CartProcessing() {
    const stepperRef = useRef(null);

    return (
            <Stepper ref={stepperRef} linear={true}>
                <StepperPanel header="Položky">
                    <div className="flex flex-column h-12rem">
                        <div
                            className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content
                            I
                        </div>
                    </div>
                    <div className="flex pt-4 justify-content-end">
                        <Button label="Pokračovať" icon="pi pi-arrow-right" iconPos="right"
                                onClick={() => stepperRef.current.nextCallback()}/>
                    </div>
                </StepperPanel>
                <StepperPanel header="Doprava a platba">
                    <div className="flex flex-column h-12rem">
                        <div
                            className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content
                            II
                        </div>
                    </div>
                    <div className="flex pt-4 justify-content-between">
                        <Button label="Back" severity="secondary" icon="pi pi-arrow-left"
                                onClick={() => stepperRef.current.prevCallback()}/>
                        <Button label="Next" icon="pi pi-arrow-right" iconPos="right"
                                onClick={() => stepperRef.current.nextCallback()}/>
                    </div>
                </StepperPanel>
                <StepperPanel header="Dodacie údaje">
                    <div className="flex flex-column h-12rem">
                        <div
                            className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content
                            III
                        </div>
                    </div>
                    <div className="flex pt-4 justify-content-start">
                        <Button label="Back" severity="secondary" icon="pi pi-arrow-left"
                                onClick={() => stepperRef.current.prevCallback()}/>
                    </div>
                </StepperPanel>
            </Stepper>
    )
}
