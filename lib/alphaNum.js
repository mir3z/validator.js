import { isOneOfType, str } from "./types"
import { overEvery } from "./utils";
import { like } from "./like";

// alphaNum :: () -> String -> Bool
export const alphaNum = () => overEvery(isOneOfType(str), like(ALPHA_NUM_REGEXP));

const ALPHA_NUM_REGEXP = /^[a-z0-9]+$/i;