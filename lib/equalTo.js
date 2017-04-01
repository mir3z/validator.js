import { isOneOfType, str, num } from "./types"
import { overEvery } from "./utils";

// equalsTo :: String -> String -> Boolean
// equalsTo :: Number -> Number -> Boolean
export const equalTo = expected => overEvery(isOneOfType(str, num), subject => subject === expected);