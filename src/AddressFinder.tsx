import { ReactElement, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";

import { AddressFinderContainerProps } from "../typings/AddressFinderProps";

import "./ui/AddressFinder.css";

export function AddressFinder({ sampleText }: AddressFinderContainerProps): ReactElement {
    return <HelloWorldSample sampleText={sampleText ? sampleText : "World"} />;
}
