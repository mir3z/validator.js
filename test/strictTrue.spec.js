import { expect } from "chai"
import { arg, successVerifier, failureVerifier } from "./testUtils";

import { strictTrue } from "../lib/strictTrue";

describe("strictTrue", () => {
    const isStrictTrue = (input) => strictTrue()(input);
    const success = successVerifier(isStrictTrue);
    const failure = failureVerifier(isStrictTrue);

    it("creates validator", () => expect(strictTrue()).to.be.a("function"));

    it("fails if null is given", failure(arg(null)));

    it("fails if undefined is given", failure(arg(undefined)));

    it("fails if object is given", failure(arg({})));

    it("fails if false value is given", failure(arg(false)));

    it("fails if array is given", failure(arg([1, 2])));

    it("fails is empty string is given", failure(arg("")));

    it("fails if blank string is given", failure(arg("    ")));

    it("succeeds if true value is given", success(arg(true)));
});