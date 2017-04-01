import { isOneOfType, num} from "./types"
import { overEvery } from "./utils";

// greaterThan :: Number -> Number -> Boolean
export const greaterThan = limit => overEvery(isOneOfType(num), subject => subject > limit);