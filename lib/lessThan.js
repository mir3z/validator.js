import { isOneOfType, num} from "./types"
import { overEvery } from "./utils";

// lessThan :: Number -> Number -> Boolean
export const lessThan = limit => overEvery(isOneOfType(num), subject => subject < limit);