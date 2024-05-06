declare function dojoDynamicRequire(deps: string[], cb: (...deps: any) => void): void;

type CustomWindow = Window & typeof globalThis & { AddressFinder: any };

declare let window: CustomWindow;
