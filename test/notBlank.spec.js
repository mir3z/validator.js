import { expect } from "chai"
import { arg, successVerifier, failureVerifier } from "./testUtils";

import { notBlank } from "../lib/notBlank";

describe("notBlank", () => {
    const isNotBlank = input => notBlank()(input);
    const success = successVerifier(isNotBlank);
    const failure = failureVerifier(isNotBlank);

    it("creates validator", () => expect(notBlank()).to.be.a("function"));

    it("fails if null is given", failure(arg(null)));

    it("fails if undefined is given", failure(arg(undefined)));

    it("fails if object is given", failure(arg({})));

    it("fails if false value is given", failure(arg(false)));

    it("fails if array is given", failure(arg([1, 2])));

    it("fails is empty string is given", failure(arg("")));

    it("fails if blank string is given", failure(arg("    ")));

    it("succeeds if non-blank value is given", success(
        arg("foo"),
        arg("500600"),
        arg("  foo100"),
        arg("象形文字"),
        arg(0),
        arg(12),
        arg(3.1415)
    ));
});
