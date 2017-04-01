import { isOneOfType, str, arr } from "./types"
import { overEvery } from "./utils";

// longerThan :: Number -> String -> Boolean
// longerThan :: Number -> [*] -> Boolean
export const longerThan = length => overEvery(isOneOfType(str, arr), subject => subject.length > length);