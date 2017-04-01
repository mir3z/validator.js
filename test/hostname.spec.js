import { expect } from "chai"
import { arg, successVerifier, failureVerifier } from "./testUtils";

import { hostname } from "../lib/hostname";

describe("hostname", () => {
    const isHostname = (input) => hostname()(input);
    const success = successVerifier(isHostname);
    const failure = failureVerifier(isHostname);

    it("creates validator", () => expect(hostname()).to.be.a("function"));

    it("fails if null is given", failure(arg(null)));

    it("fails if undefined is given", failure(arg(undefined)));

    it("fails if object is given", failure(arg({})));

    it("fails if false value is given", failure(arg(false)));

    it("fails if array is given", failure(arg([1, 2])));

    it("fails is empty string is given", failure(arg("")));

    it("fails if blank string is given", failure(arg("    ")));

    it("fails if number is given", failure(
        arg(3.14),
        arg(100),
        arg(-200),
        arg(0.01),
    ));

    it("fails if invalid hostname address is given", failure(
        arg("foo@gmail.com"),
        arg("http://www.example.com"),
        arg("#e.com"),
        arg("#%$"),
        arg("4dot.com"),
        arg("6.com"),
        arg("0"),
        arg("127.0.0.1"),
        arg(".")
    ));

    it("succeeds if valid hostname address is given", success(
        arg("host"),
        arg("host.example"),
        arg("en.wikipedia.org"),
        arg("www.example.com")
    ));
});