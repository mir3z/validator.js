import { expect } from "chai"

import {
    all,
    any,
    is,
    not,
    validate,
    notBlank,
    alphaNum,
    longerThan,
    hostname,
    ip4,
    integer,
    greaterThan,
    lessThan,
    equalTo,
    strictTrue
} from "../lib";

describe("Integration tests", () => {
    it("username", () => {
        const validate = all(
            is(notBlank(), "Username cannot be blank"),
            is(alphaNum(), "Username can contain only letters and digits")
        );

        expect(validate("john100").isSuccess).to.be.ok;

        expect(validate("").merge()).to.eql([
            "Username cannot be blank",
            "Username can contain only letters and digits"
        ]);

        expect(validate("#john").merge()).to.eql([
            "Username can contain only letters and digits"
        ]);
    });

    it("password", () => {
        const MIN_LENGTH = 6;
        const validate = all(
            is(notBlank(), "Password cannot be blank"),
            is(longerThan(MIN_LENGTH - 1), `Password must have at least ${ MIN_LENGTH } characters`)
        );

        expect(validate(",,strong,,pass").isSuccess).to.be.ok;

        expect(validate("").merge()).to.eql([
            "Password cannot be blank",
            "Password must have at least 6 characters"
        ]);
    });

    it("network location", () => {
        const validate = all(
            is(notBlank(), "Cannot be blank"),
            any(
                is(ip4(), "Invalid IP address"),
                is(hostname(), "Invalid hostname")
            )
        );

        expect(validate("109.173.208.224").isSuccess).to.be.ok;
        expect(validate("mysite.com").isSuccess).to.be.ok;

        expect(validate("").merge()).to.eql([
            "Cannot be blank",
            "Invalid IP address",
            "Invalid hostname"
        ]);

        expect(validate("500.120.120.120").merge()).to.eql([
            "Invalid IP address",
            "Invalid hostname"
        ]);
    });

    it("validate age", () => {
        const validateAge = age => {
            return validate(age, all(
                is(integer(), "Invalid age"),
                is(greaterThan(18), "You must be older than 18"),
                is(lessThan(30), "You must be younger than 30")
            ));
        };

        expect(validateAge(25)).to.be.undefined;
        expect(validateAge(16)).to.eql(["You must be older than 18"]);
        expect(validateAge(36)).to.eql(["You must be younger than 30"]);
        expect(validateAge("too old")).to.eql([
            "Invalid age",
            "You must be older than 18",
            "You must be younger than 30"
        ]);
    });

    it("validate secret", () => {
        const secret = "s2cr3t";
        const validateSecret = value => validate(value, is(equalTo(secret), "Invalid secret!"));

        expect(validateSecret(secret)).to.be.undefined;
        expect(validateSecret("naah")).to.eql(["Invalid secret!"]);
    });

    it("validates form data", () => {
        const invalidFormData = {
            username: "john-snow-500",
            age: 16,
            sex: "male",
            favouriteColor: "pink",
            acceptedTos: false
        };

        const validFormData = {
            username: "johnSnow500",
            age: 18,
            sex: "male",
            favouriteColor: "black",
            acceptedTos: true
        };

        const formValidators = {
            username: username => validate(username, all(
                is(notBlank(), "Username cannot be blank"),
                is(alphaNum(), "Username must contain only letters and numbers")
            )),
            age: age => validate(age, all(
                is(integer(), "Invalid age"),
                is(greaterThan(17), "You must be at least 18 years old")
            )),
            sex: sex => validate(sex, is(equalTo("male"), "You must be male")),
            favouriteColor: color => validate(color, is(equalTo("black"), "Your favourite color must be black")),
            acceptedTos: accepted => validate(accepted, is(strictTrue(), "You must accept terms of service"))
        };

        const validateForm = (formData, validators) => {
            return Object.keys(formData)
                .reduce((errors, key) => {
                    const fieldErrors = validators[key](formData[key]);

                    return fieldErrors
                        ? { ...errors, [key]: fieldErrors }
                        : errors;
                }, undefined);
        };

        const validFormErrors = validateForm(validFormData, formValidators);
        const invalidFormErrors = validateForm(invalidFormData, formValidators);

        expect(validFormErrors).to.be.undefined;
        expect(invalidFormErrors).to.eql({ 
            username: ["Username must contain only letters and numbers"],
            age: ["You must be at least 18 years old"],
            favouriteColor: ["Your favourite color must be black"],
            acceptedTos: ["You must accept terms of service"]
        });
    });

    it("blank", () => {
        const isBlank = not(notBlank());

        expect(isBlank("")).to.be.true;
        expect(isBlank("foo")).to.be.false;
    });
});