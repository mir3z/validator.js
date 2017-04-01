import { isOneOfType, str, arr } from "./types"
import { overEvery } from "./utils";

// exactLength :: Number -> String -> Boolean
// exactLength :: Number -> [*] -> Boolean
export const exactLength = length => overEvery(isOneOfType(str, arr), subject => subject.length === length);