import { isOneOfType, str, arr } from "./types"
import { overEvery } from "./utils";

// shorterThan :: Number -> String -> Boolean
// shorterThan :: Number -> [*] -> Boolean
export const shorterThan = length => overEvery(isOneOfType(str, arr), subject => subject.length < length);