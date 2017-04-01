import { expect } from "chai"
import { arg, successVerifier, failureVerifier } from "./testUtils";

import { number } from "../lib/number";

describe("number", () => {
    const isNum = (input) => number()(input);
    const success = successVerifier(isNum);
    const failure = failureVerifier(isNum);

    it("creates validator", () => expect(number()).to.be.a("function"));

    it("fails if null is given", failure(arg(null)));

    it("fails if undefined is given", failure(arg(undefined)));

    it("fails if object is given", failure(arg({})));

    it("fails if false value is given", failure(arg(false)));

    it("fails if array is given", failure(arg([1, 2])));

    it("fails is empty string is given", failure(arg("")));

    it("fails if blank string is given", failure(arg("    ")));

    it("fails if invalid decimal number is given", failure(
        arg("3.14.15"),
        arg("--315"),
        arg("++15"),
        arg("+-30"),
        arg("100n"),
        arg("a9"),
        arg("3a"),
        arg("000"),
        arg("0001"),
        arg("0346"),
        arg(".45"),
        arg("-."),
        arg("+."),
        arg(".."),
        arg(",.")
    ));

    it("succeeds if valid decimal numeric value is given", success(
        arg("100"),
        arg("0"),
        arg("-100"),
        arg("+500"),
        arg("3.14"),
        arg("-6.123"),
        arg("+23.0083"),
        arg("12.56"),
        arg("+12.56"),
        arg("-10.9"),
        arg("0.9"),
        arg("-0.4"),
        arg("+0.2"),
        arg("0.002"),
        arg("15,78")
    ));

    it("succeeds if Number is given", success(
        arg(345),
        arg(-12),
        arg(0.96),
        arg(3.14),
        arg(-3.77),
        arg(+5)
    ));
});