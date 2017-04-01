import { expect } from "chai"
import { arg, successVerifier, failureVerifier } from "./testUtils";

import { shorterThan } from "../lib/shorterThan";

describe("shorterThan", () => {
    const isShorterThan = (length, input) => shorterThan(length)(input);
    const success = successVerifier(isShorterThan);
    const failure = failureVerifier(isShorterThan);

    it("creates validator", () => expect(shorterThan()).to.be.a("function"));

    it("fails if null is given", failure(arg(5, null)));

    it("fails if undefined is given", failure(arg(6, undefined)));

    it("fails if false value is given", failure(arg(7, false)));

    it("fails if object is given", failure(arg(8, {})));

    it("fails if number is given", failure(arg(9, 12345)));

    it("fails if value length is equal to the given limit", failure(
        arg(4, "baar"),
        arg(5, [5, 4, 3, 2, 1]),
        arg(2, "  "),
        arg(0, "")
    ));

    it("fails if value is longer than the given limit", failure(
        arg(3, "foob"),
        arg(5, "      "),
        arg(2, [1, 1, 1])
    ));

    it("succeeds if value is shorter than the given limit", success(
        arg(3, "fo"),
        arg(2, " "),
        arg(1, ""),
        arg(3, [2, 3]),
        arg(1, []),
    ));
});