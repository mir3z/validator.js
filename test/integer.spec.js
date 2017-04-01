import { expect } from "chai"
import { arg, successVerifier, failureVerifier } from "./testUtils";

import { integer } from "../lib/integer";

describe("integer", () => {
    const isInt = (input) => integer()(input);
    const success = successVerifier(isInt);
    const failure = failureVerifier(isInt);

    it("creates validator", () => expect(integer()).to.be.a("function"));

    it("fails if null is given", failure(arg(null)));

    it("fails if undefined is given", failure(arg(undefined)));

    it("fails if object is given", failure(arg({})));

    it("fails if false value is given", failure(arg(false)));

    it("fails if array is given", failure(arg([1, 2])));

    it("fails is empty string is given", failure(arg("")));

    it("fails if blank string is given", failure(arg("    ")));

    it("fails if float is given", failure(
        arg("3.14"),
        arg("-3.14"),
        arg("+3.14")
    ));

    it("fails if invalid integer is given", failure(
        arg("-0"),
        arg("+0"),
        arg("00001"),
        arg("-"),
        arg("+"),
        arg("-+")
    ));

    it("succeeds if valid integer value is given", success(
        arg("100"),
        arg("0"),
        arg("-100"),
        arg("+500"),
        arg("123783405873498578687")
    ));

    it("succeeds if Number is given", success(
        arg(345),
        arg(-12),
        arg(+5)
    ));
});