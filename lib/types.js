import { overSome } from "./utils";

export const isOneOfType = overSome;
export const str = subject => typeof subject === "string";
export const num = subject => typeof subject === "number";
export const arr = subject => Array.isArray(subject);
