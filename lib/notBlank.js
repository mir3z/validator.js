import { isOneOfType, str, num } from "./types"
import { overEvery } from "./utils";

// notBlank :: () -> String -> Boolean
// notBlank :: () -> Number -> Boolean
export const notBlank = () => overEvery(isOneOfType(str, num), subject => String(subject).trim().length > 0);
