import { expect } from "chai"
import { arg, successVerifier, failureVerifier } from "./testUtils";

import { greaterThan } from "../lib/greaterThan";

describe("greaterThan", () => {
    const isGreaterThan = (limit, input) => greaterThan(limit)(input);
    const success = successVerifier(isGreaterThan);
    const failure = failureVerifier(isGreaterThan);

    it("creates validator", () => expect(greaterThan()).to.be.a("function"));

    it("fails if null is given", failure(arg(3, null)));

    it("fails if undefined is given", failure(arg(3, undefined)));

    it("fails if false value is given", failure(arg(2, false)));

    it("fails if object is given", failure(arg(2, {})));

    it("fails if array is given", failure(arg(1, [1, 2])));

    it("fails if value is equal to the given limit", failure(arg(5, 5)));

    it("fails if value is less than the given limit", failure(
        arg(5, 4),
        arg(-1, -5)
    ));

    it("succeeds if value is greater than the given limit", success(
        arg(5, 6),
        arg(-5, -4),
        arg(0, 0.01),
    ));
});