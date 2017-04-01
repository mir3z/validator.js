import { expect } from "chai"
import { arg, successVerifier, failureVerifier } from "./testUtils";

import { exactLength } from "../lib/exactLength";

describe("exactLength", () => {
    const hasExactLength = (length, input) => exactLength(length)(input);
    const success = successVerifier(hasExactLength);
    const failure = failureVerifier(hasExactLength);

    it("creates validator", () => expect(exactLength()).to.be.a("function"));

    it("fails if null is given", failure(arg(3, null)));

    it("fails if undefined is given", failure(arg(3, undefined)));

    it("fails if false value is given", failure(arg(2, false)));

    it("fails if object is given", failure(arg(2, {})));

    it("fails if number is given", failure(arg(3, 12345)));

    it("fails if value is longer than the given limit", failure(
        arg(4, "fooba"),
        arg(2, [5, 4, 3]),
        arg(1, "  "),
        arg(0, [1])
    ));

    it("fails if value is shorter than the given limit", failure(
        arg(3, "fo"),
        arg(5, "   "),
        arg(3, ""),
        arg(2, [1])
    ));

    it("succeeds if value has the same length as given limit", success(
        arg(3, "foo"),
        arg(2, "  "),
        arg(0, ""),
        arg(3, [2, 3, 4]),
        arg(0, []),
    ));
});