import { expect } from "chai"
import { arg, successVerifier, failureVerifier } from "./testUtils";

import { alphaNum } from "../lib/alphaNum";

describe("alphaNum", () => {
    const isAlphaNum = (input) => alphaNum()(input);
    const success = successVerifier(isAlphaNum);
    const failure = failureVerifier(isAlphaNum);

    it("creates validator", () => expect(alphaNum()).to.be.a("function"));

    it("fails if null is given", failure(arg(null)));

    it("fails if undefined is given", failure(arg(undefined)));

    it("fails if object is given", failure(arg({})));

    it("fails if false value is given", failure(arg(false)));

    it("fails if array is given", failure(arg([1, 2])));

    it("fails is empty string is given", failure(arg("")));

    it("fails if blank string is given", failure(arg("    ")));

    it("fails if non alphanumeric value is given", failure(
        arg("john@mail"),
        arg("!scream"),
        arg("foo bar"),
        arg("michael-400"),
        arg("#1"),
        arg("!@#$%^&*()-=")
    ));

    it("succeeds if alphanumeric value is given", success(
        arg("foobar"),
        arg("john100"),
        arg("ZAQ123"),
        arg("15001")
    ));
});