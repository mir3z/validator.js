import { isOneOfType, str } from "./types"
import { overEvery } from "./utils";
import { like } from "./like";

// email :: () -> String -> Boolean
export const email = () => overEvery(isOneOfType(str), like(EMAIL_REGEXP));

const EMAIL_REGEXP = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i;