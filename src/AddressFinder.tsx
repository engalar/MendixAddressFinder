import { Fragment, ReactElement, createElement, useEffect, useState } from "react";
import { AddressFinderContainerProps } from "../typings/AddressFinderProps";

import "./ui/AddressFinder.css";
import { Address, Country, WidgetInput } from "react-addressfinder";
import classNames from "classnames";

export function AddressFinder(props: AddressFinderContainerProps): ReactElement {
    const showLabel = props.showLabel;
    const labelText = props.labelText;
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
    const wrapperInputWidget = (
        <Fragment>
            {loaded && props.apiKey.status === "available" ? (
                <WidgetInput
                    addressFinderKey={props.apiKey.value}
                    inputClassName={"form-control "}
                    listClassName={"widget-combobox-menu"}
                    // widget-combobox-item-highlighted widget-combobox-item-selected
                    itemClassName={"widget-combobox-item"}
                    hoverClassName="widget-combobox-item-highlighted"
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
                <input disabled className="form-control af-hidden-autofill-icon"></input>
            )}
        </Fragment>
    );
    return (
        <Fragment>
            <div
                className={classNames("widget-address-finder mx-textbox form-group", props.class, {
                    "no-columns": !showLabel || props.formOrientation === "vertical"
                })}
            >
                {showLabel ? (
                    props.formOrientation === "vertical" ? (
                        <Fragment>
                            <label className={classNames("control-label")}>{labelText}</label>
                            {wrapperInputWidget}
                        </Fragment>
                    ) : (
                        <Fragment>
                            <label className={classNames("control-label", "col-sm-" + props.labelWidth)}>
                                {labelText}
                            </label>
                            <div className={classNames("col-sm-" + (12 - props.labelWidth))}>{wrapperInputWidget}</div>
                        </Fragment>
                    )
                ) : (
                    wrapperInputWidget
                )}
            </div>
            <div id={"address-container-" + props.name + "_id"}></div>
        </Fragment>
    );
}
