import { isOneOfType, str, num } from "./types"
import { overEvery } from "./utils";
import { like } from "./like";

// number :: () -> String -> Boolean
// number :: () -> Number -> Boolean
export const number = () => overEvery(isOneOfType(str, num), like(NUMBER_REGEXP));

const NUMBER_REGEXP = /^0$|^[-+]?([1-9]+[0-9]*|[0-9]+[.,][0-9]+)$/;