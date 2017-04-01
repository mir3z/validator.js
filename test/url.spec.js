import { expect } from "chai";
import { arg, successVerifier, failureVerifier } from "./testUtils";

import { url } from "../lib/url";

describe("url", () => {
    const isURL = (input) => url()(input);
    const success = successVerifier(isURL);
    const failure = failureVerifier(isURL);

    it("creates validator", () => expect(url()).to.be.a("function"));

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

    it("fails if invalid URL address is given", failure(
        arg("http://"),
        arg("http://."),
        arg("http://../"),
        arg("http://??/"),
        arg("http://##/"),
        arg("http://a.b--c.de/"),
        arg("http://10.1.1.0"),
        arg("http://1.1.1.1.1"),
        arg("http://.www.foo.bar./"),
        arg("foo.com"),
        arg("http:///a"),
        arg("http://foo.bar?q=Spaces should be encoded")
    ));

    it("succeeds if valid URL address is given", success(
        arg("http://foo.com/blah_blah"),
        arg("http://foo.com/blah_blah/"),
        arg("http://www.example.com/wpstyle/?p=364"),
        arg("https://www.example.com/foo/?bar=baz&inga=42&quux"),
        arg("http://userid:password@example.com:8080"),
        arg("http://142.42.1.1:8080/"),
        arg("http://foo.bar/?q=Test%20URL-encoded%20stuff"),
        arg("ftp://foo.example.com")
    ));
});