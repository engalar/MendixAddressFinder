import { ReactElement, createElement, Fragment, useEffect, useState } from "react";
import { AddressFinderContainerProps } from "../typings/AddressFinderProps";

import "./ui/AddressFinder.css";
import { Country, WidgetInput } from "react-addressfinder";

export function AddressFinder({ sampleText }: AddressFinderContainerProps): ReactElement {
    console.log("AddressFinder.sampleText", sampleText);
    // state loaded
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        // @ts-ignore
        if (!window.AddressFinder) {
            dojoDynamicRequire(["https://api.addressfinder.io/assets/v3/widget.js"], AddressFinder => {
                // @ts-ignore
                window.AddressFinder = AddressFinder;
                setLoaded(true);
            });
        } else {
            setLoaded(true);
        }
    }, []);
    return (
        <div>
            {loaded && (
                <Fragment>
                    <WidgetInput
                        addressFinderKey={"ADDRESSFINDER_DEMO_KEY"}
                        inputClassName={"fieldClassName"}
                        id={"myid"} // todo: generate unique id
                        name={"myName"}
                        country={Country.NZ} // todo: make it configable
                        onSelected={(fullAddress, address) => {
                            console.log(fullAddress, address);
                        }}
                    />
                    <div id="address-container-myid"></div>
                </Fragment>
            )}
        </div>
    );
}
