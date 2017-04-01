import { expect } from "chai"
import { arg, successVerifier, failureVerifier } from "./testUtils";

import { ip4 } from "../lib/ip4";

describe("ip4", () => {
    const isIP4 = (input) => ip4()(input);
    const success = successVerifier(isIP4);
    const failure = failureVerifier(isIP4);

    it("creates validator", () => expect(ip4()).to.be.a("function"));

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

    it("fails if invalid IPv4 address is given", failure(
        arg("ip"),
        arg("255"),
        arg("-20"),
        arg("-100.200"),
        arg("127.100"),
        arg("127.100.100"),
        arg("256.100.100.100"),
        arg("100.256.100.100"),
        arg("100.100.256.100"),
        arg("100.100.100.256"),
        arg("127.0.a.1"),
        arg("2001:0db8:0000:0042:0000:8a2e:0370:7334")
    ));

    it("succeeds if valid IPv4 address is given", success(
        arg("127.0.0.1"),
        arg("255.255.255.255"),
        arg("192.168.0.12"),
        arg("192.168.0.1"),
        arg("100.200.100.200")
    ));
});