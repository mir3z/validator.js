import { isOneOfType, str } from "./types"
import { overEvery } from "./utils";
import { like } from "./like";

// ip4 :: () -> String -> Boolean
export const ip4 = () => overEvery(isOneOfType(str), like(IP4_REGEXP));

const IP4_REGEXP = /^(([01]?[0-9]{1,2}|2[0-4][0-9]|25[0-5])\.){3}([01]?[0-9]{1,2}|2[0-4][0-9]|25[0-5])$/;