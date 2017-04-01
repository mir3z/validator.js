import { expect } from "chai"
import { arg, successVerifier, failureVerifier } from "./testUtils";

import { strictFalse } from "../lib/strictFalse";

describe("strictFalse", () => {
    const isStrictFalse = (input) => strictFalse()(input);
    const success = successVerifier(isStrictFalse);
    const failure = failureVerifier(isStrictFalse);

    it("creates validator", () => expect(strictFalse()).to.be.a("function"));

    it("fails if null is given", failure(arg(null)));

    it("fails if undefined is given", failure(arg(undefined)));

    it("fails if object is given", failure(arg({})));

    it("fails if true value is given", failure(arg(true)));

    it("fails if array is given", failure(arg([1, 2])));

    it("fails is empty string is given", failure(arg("")));

    it("fails if blank string is given", failure(arg("    ")));

    it("succeeds if false value is given", success(arg(false)));
});