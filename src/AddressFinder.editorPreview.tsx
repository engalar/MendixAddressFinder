import { ReactElement, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";
import { AddressFinderPreviewProps } from "../typings/AddressFinderProps";

export function preview({ sampleText }: AddressFinderPreviewProps): ReactElement {
    return <HelloWorldSample sampleText={sampleText} />;
}

export function getPreviewCss(): string {
    return require("./ui/AddressFinder.css");
}
