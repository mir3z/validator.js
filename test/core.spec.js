import { expect } from "chai"
import { spy } from "sinon";
import { Success, Failure } from "data.validation";
import {
    is,
    not,
    all,
    any,
    validate
} from "../lib/core";

const ALWAYS_TRUE = () => true;
const ALWAYS_FALSE = () => false;
const VALIDATED_VALUE = 47;

describe("is", () => {
    it("calls given validator", () => {
        const validator = spy();
        const isValid = is(validator);

        isValid(VALIDATED_VALUE);

        expect(validator.calledWith(VALIDATED_VALUE)).to.be.true;
    });

    describe("if predicate is truthy", () => {
        it("returns Success carrying validated value", () => {
            const isValid = is(ALWAYS_TRUE);

            expect(isValid(VALIDATED_VALUE)).to.eql(Success(VALIDATED_VALUE));
        });
    });

    describe("if predicate is false", () => {
        it("returns Failure if predicate", () => {
            const isValid = is(ALWAYS_FALSE);

            expect(isValid(VALIDATED_VALUE)).to.eql(Failure([""]));
        });

        it("return Failure with message if given", () => {
            const MESSAGE = "error!";
            const isValid = is(ALWAYS_FALSE, MESSAGE);

            expect(isValid(VALIDATED_VALUE)).to.eql(Failure([MESSAGE]));
        });
    });
});

describe("not", () => {
    it("calls validator", () => {
        const validator = spy();
        const isValid = not(validator);

        isValid(VALIDATED_VALUE);

        expect(validator.calledWith(VALIDATED_VALUE)).to.be.true;
    });

    it("negates true", () => {
        const isValid = not(ALWAYS_TRUE);

        expect(isValid()).to.be.false;
    });

    it("negates false", () => {
        const isValid = not(ALWAYS_FALSE);

        expect(isValid()).to.be.true;
    });
});

describe("all", () => {
    it("succeeds if no validator is given", () => {
        const validate = all();

        const validation = validate(VALIDATED_VALUE);

        expect(validation.isEqual(Success(VALIDATED_VALUE))).to.be.true;
    });

    it("succeeds if all validators succeed", () => {
        const validate = all(
            value => Success(value),
            value => Success(value)
        );

        const validation = validate(VALIDATED_VALUE);

        expect(validation.isEqual(Success(VALIDATED_VALUE))).to.be.true;
    });

    it("fails if any validator fails", () => {
        const validate = all(
            value => Failure([value]),
            value => Success(value)
        );

        const validation = validate(VALIDATED_VALUE);

        expect(validation.isFailure).to.be.true;
    });

    it("has combined all failure messages", () => {
        const validate = all(
            value => Failure(["failure1"]),
            value => Failure(["failure2"]),
            value => Success(value)
        );

        const validation = validate(VALIDATED_VALUE);

        expect(validation.merge()).to.eql(["failure1", "failure2"]);
    });
});

describe("any", () => {
    it("succeeds if no validator is given", () => {
        const validate = any();

        const validation = validate(VALIDATED_VALUE);

        expect(validation.isEqual(Success(VALIDATED_VALUE))).to.be.true;
    });

    it("succeeds if any validator succeed", () => {
        const validate = any(
            value => Failure(["failure"]),
            value => Success(value)
        );

        const validation = validate(VALIDATED_VALUE);

        expect(validation.isEqual(Success(VALIDATED_VALUE))).to.be.true;
    });

    it("fails if all validators fail", () => {
        const validate = any(
            value => Failure(["failure1"]),
            value => Failure(["failure2"]),
        );

        const validation = validate(VALIDATED_VALUE);

        expect(validation.isFailure).to.be.true;
    });

    it("has combined all failure messages", () => {
        const validate = any(
            value => Failure(["failure1"]),
            value => Failure(["failure2"])
        );

        const validation = validate(VALIDATED_VALUE);

        expect(validation.merge()).to.eql(["failure1", "failure2"]);
    });
});

describe("validate", () => {
    it("returns undefined if validation succeeds", () => {
        const errors = validate("foo", () => Success("foo"));

        expect(errors).to.be.undefined;
    });

    it("returns list of errors if validation fails", () => {
        const errors = validate("foo", all(
            () => Failure(["invalid1"]),
            () => Failure(["invalid2"])
        ));

        expect(errors).to.eql(["invalid1", "invalid2"]);
    });
});