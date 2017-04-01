import { expect } from "chai";

export const verifier =
    expected =>
    validator =>
    (...args) =>
    () => args.forEach(arg => expect(validator(...arg)).to.equal(expected));

export const failureVerifier = verifier(false);
export const successVerifier = verifier(true);

export const arg = (...a) => a;
