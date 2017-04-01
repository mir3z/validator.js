import { expect } from "chai"
import { arg, successVerifier, failureVerifier } from "./testUtils";

import { email } from "../lib/email";

describe("email", () => {
    const isEmail = (input) => email()(input);
    const success = successVerifier(isEmail);
    const failure = failureVerifier(isEmail);

    it("creates validator", () => expect(email()).to.be.a("function"));

    it("fails if null is given", failure(arg(null)));

    it("fails if undefined is given", failure(arg(undefined)));

    it("fails if object is given", failure(arg({})));

    it("fails if false value is given", failure(arg(false)));

    it("fails if array is given", failure(arg([1, 2])));

    it("fails is empty string is given", failure(arg("")));

    it("fails if blank string is given", failure(arg("    ")));

    it("fails if number is given", failure(
        arg(3.14),
        arg(102),
        arg(-345),
        arg(0.56),
    ));

    it("fails if invalid email is given", failure(
        arg("example.com"),
        arg("@example.com"),
        arg("john@"),
        arg("@"),
        arg("#@example.com"),
        arg("john@com"),
        arg("john@#.com"),
        arg("john@.com")
    ));

    it("succeeds if valid email address is given", success(
        arg("foo@example.com"),
        arg("bar@example.com"),
        arg("john+bar@example.com"),
        arg("666@example.com")
    ));
});