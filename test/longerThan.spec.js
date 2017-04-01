import { expect } from "chai"
import { arg, successVerifier, failureVerifier } from "./testUtils";

import { longerThan } from "../lib/longerThan";

describe("longerThan", () => {
    const isLongerThan = (length, input) => longerThan(length)(input);
    const success = successVerifier(isLongerThan);
    const failure = failureVerifier(isLongerThan);

    it("creates validator", () => expect(longerThan()).to.be.a("function"));

    it("fails if null is given", failure(arg(3, null)));

    it("fails if undefined is given", failure(arg(3, undefined)));

    it("fails if false value is given", failure(arg(2, false)));

    it("fails if object is given", failure(arg(2, {})));

    it("fails if number is given", failure(arg(3, 12345)));

    it("fails if value length is equal to the given limit", failure(
        arg(4, "baar"),
        arg(3, [5, 4, 3]),
        arg(2, "  "),
        arg(0, "")
    ));

    it("fails if value is shorter than the given limit", failure(
        arg(3, "fo"),
        arg(5, "   "),
        arg(3, ""),
        arg(2, [1])
    ));

    it("succeeds if value is longer than the given limit", success(
        arg(3, "foob"),
        arg(2, "   "),
        arg(0, "x"),
        arg(3, [2, 3, 4, 5])
    ));
});