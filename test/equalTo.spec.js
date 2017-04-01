import { expect } from "chai"
import { arg, successVerifier, failureVerifier } from "./testUtils";

import { equalTo } from "../lib/equalTo";

describe("equalTo", () => {
    const isEqualTo = (comparing, input) => equalTo(comparing)(input);
    const success = successVerifier(isEqualTo);
    const failure = failureVerifier(isEqualTo);

    it("creates validator", () => expect(equalTo()).to.be.a("function"));

    it("fails if null is given", failure(arg(3, null)));

    it("fails if undefined is given", failure(arg(3, undefined)));

    it("fails if false value is given", failure(arg(2, false)));

    it("fails if object is given", failure(arg(2, {})));

    it("fails if values are not equal", failure(
        arg(100, 200),
        arg("foo", "bar"),
        arg(100, "100"),
        arg("100", 100),
        arg("", " "),
        arg(100, "100"),
        arg("100", 100),
    ));

    it("succeeds if both values are equal", success(
        arg(100, 100),
        arg("foo", "foo"),
        arg("", "")
    ));
});