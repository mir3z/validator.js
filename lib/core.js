import { Success, Failure } from "data.validation";

// is :: (v -> Boolean, String) -> v -> Validation[α, β]
export const is = (predicate, message = "") => subject => predicate(subject) ? Success(subject) : Failure([message]);


// not :: (v -> Boolean) -> v -> Boolean
export const not = validator => subject => !validator(subject);

// all :: ...Validation[α, β] -> v -> Validation[γ, δ]
export function all(...validators) {
    return subject => {
        const validations = validators.map(validator => validator(subject));

        return apply(validations, subject);
    };
}

// any :: ...Validation[α, β] -> v -> Validation[γ, δ]
export function any(...validators) {
    return subject => {
        const validations = validators.map(validator => validator(subject));
        const success = validations.find(validation => validation.isSuccess);
        const failures = validations.filter(validation => validation.isFailure);

        return success || apply(failures, subject);
    };
}

// validate :: (v, v -> Validation[α, β]) -> undefined|[String]
export function validate(subject, validator) {
    return validator(subject).fold(errors => errors, () => undefined);
}

const curried = (subject, n) => new Array(n).fill(null).reduce(fn => () => fn, subject);

const apply = (validations, subject) => {
    const initial = Success(curried(subject, validations.length));
    return validations.reduce((acc, validation) => acc.ap(validation), initial);
};