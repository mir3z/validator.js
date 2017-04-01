import { expect } from "chai"
import { arg, successVerifier, failureVerifier } from "./testUtils";

import { like } from "../lib/like";

describe("like", () => {
    const isLike = (pattern, input) => like(pattern)(input);
    const success = successVerifier(isLike);
    const failure = failureVerifier(isLike);

    it("creates validator", () => expect(like()).to.be.a("function"));

    it("fails if null is given", failure(arg(/null/, null)));

    it("fails if undefined is given", failure(arg(/undefined/, undefined)));

    it("fails if object is given", failure(arg(new RegExp("[object Object]"), {})));

    it("fails if array is given", failure(arg(new RegExp(""), [])));

    it("fails if boolean is given", failure(
        arg(/true/, true),
        arg(/false/, false)
    ));

    it("succeeds if value matches pattern", success(
        arg(/foo/, "foobar"),
        arg(/fo+/, "foooooobar"),
        arg(/\s/, " "),
        arg(/500/, 15001),
        arg(/3\.14/, 3.1415)
    ));
});