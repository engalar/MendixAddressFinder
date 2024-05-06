import { ReactElement, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";
import { AddressFinderPreviewProps } from "../typings/AddressFinderProps";

export function preview(props: AddressFinderPreviewProps): ReactElement {
    console.log(props);

    return <HelloWorldSample sampleText={"Hello World"} />;
}

export function getPreviewCss(): string {
    return require("./ui/AddressFinder.css");
}
