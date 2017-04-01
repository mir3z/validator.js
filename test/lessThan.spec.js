import { expect } from "chai"
import { arg, successVerifier, failureVerifier } from "./testUtils";

import { lessThan } from "../lib/lessThan";

describe("lessThan", () => {
    const isLessThan = (limit, input) => lessThan(limit)(input);
    const success = successVerifier(isLessThan);
    const failure = failureVerifier(isLessThan);

    it("creates validator", () => expect(lessThan()).to.be.a("function"));

    it("fails if null is given", failure(arg(5, null)));

    it("fails if undefined is given", failure(arg(7, undefined)));

    it("fails if false value is given", failure(arg(5, false)));

    it("fails if object is given", failure(arg(4, {})));

    it("fails if array is given", failure(arg(4, [3, 6])));

    it("fails if value is equal to the given limit", failure(arg(8, 8)));

    it("fails if value is greater than the given limit", failure(
        arg(5, 6),
        arg(-1, 0)
    ));

    it("succeeds if value is less than the given limit", success(
        arg(5, 4),
        arg(-5, -6),
        arg(1, 0.009),
    ));
});