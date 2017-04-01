import { isOneOfType, str, num } from "./types"
import { overEvery } from "./utils";

// like :: RegExp -> String -> Boolean
export const like = pattern => overEvery(isOneOfType(str, num), subject => pattern.test(String(subject)));