import { isOneOfType, str, num } from "./types"
import { overEvery } from "./utils";
import { like } from "./like";

// integer :: () -> String -> Boolean
// integer :: () -> Number -> Boolean
export const integer = () => overEvery(isOneOfType(str, num), like(INT_REGEXP));

const INT_REGEXP = /^0$|^[+\-]?[1-9]+[0-9]*$/;