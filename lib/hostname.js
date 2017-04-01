import { isOneOfType, str } from "./types"
import { overEvery } from "./utils";
import { like } from "./like";

// hostname :: () -> String -> Boolean
export const hostname = () => overEvery(isOneOfType(str), like(HOSTNAME_REGEXP));

const HOSTNAME_REGEXP = /^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$/i;