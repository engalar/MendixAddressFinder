import { ReactElement, createElement, useEffect, useState } from "react";
import { AddressFinderContainerProps } from "../typings/AddressFinderProps";

import "./ui/AddressFinder.css";
import { Address, Country, WidgetInput } from "react-addressfinder";
import classNames from "classnames";

export function AddressFinder(props: AddressFinderContainerProps): ReactElement {
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
        <div className={classNames("mx-textbox form-group", props.class)}>
            <div className="col-12">
                {loaded && props.apiKey.status === "available" ? (
                    <WidgetInput
                        addressFinderKey={props.apiKey.value}
                        inputClassName={"form-control "}
                        id={props.name + "_id"} // todo: generate unique id
                        name={props.name + "_name"}
                        country={Country.NZ} // todo: make it configable
                        onSelected={(fullAddress, address: Address) => {
                            props.fullAddress?.setValue(fullAddress || "");
                            props.line1?.setValue(address.line1 || "");
                            props.line2?.setValue(address.line2 || "");
                            props.suburb?.setValue(address.suburb || "");
                            props.state?.setValue(address.state || "");
                            props.postcode?.setValue(address.postcode || "");
                            props.country?.setValue(address.country || "");
                            props.city?.setValue(address.city || "");
                        }}
                    />
                ) : (
                    <input disabled className="form-control  af-hidden-autofill-icon"></input>
                )}
                <div id="address-container-myid"></div>
            </div>
        </div>
    );
}
