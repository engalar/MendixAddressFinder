/**
 * This file was generated from AddressFinder.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { DynamicValue, EditableValue } from "mendix";

export type FormOrientationEnum = "horizontal" | "vertical";

export interface AddressFinderContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    showLabel: boolean;
    labelText: string;
    formOrientation: FormOrientationEnum;
    labelWidth: number;
    fullAddress?: EditableValue<string>;
    line1?: EditableValue<string>;
    line2?: EditableValue<string>;
    suburb?: EditableValue<string>;
    state?: EditableValue<string>;
    postcode?: EditableValue<string>;
    country?: EditableValue<string>;
    city?: EditableValue<string>;
    apiKey: DynamicValue<string>;
}

export interface AddressFinderPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    showLabel: boolean;
    labelText: string;
    formOrientation: FormOrientationEnum;
    labelWidth: number | null;
    fullAddress: string;
    line1: string;
    line2: string;
    suburb: string;
    state: string;
    postcode: string;
    country: string;
    city: string;
    apiKey: string;
}
