validator.js
============

A handy validation library made on top of
[Data.Validation](https://github.com/folktale/data.validation)
from [Folktale](http://folktalejs.org/).

## Usage

```javascript
const isValid = greaterThan(5)

isValid(10) // true
isValid(2)  // false
```

```javascript
const validateNum = is(greaterThan(5), "Must be greater than 5")

validateNum(10) // Validation.Success(10)
validateNum(2)  // Validation.Failure(["Must be greater than 5"])
```

```javascript
const validateNum = all(
    is(number(), "Invalid number")
    is(greaterThan(5), "Must be greater than 5"),
    is(lessThan(15), "Must be less than 15")
)

validateNum(10)     // Validation.Success(10)
validateNum(20)     // Validation.Failure(["Must be less than 15"])
validateNum("huh?") // Validation.Failure(["Invalid number", "Must be greater than 5", "Must be less than 15"])
```

```javascript
const validateLocation = all(
    is(notBlank(), "Cannot be blank"),
    any(
        is(ip4(), "Invalid IP address"),
        is(hostname(), "Invalid hostname")
    )
)

validateLocation("109.173.208.224") // Validation.Success("109.173.208.224")
validateLocation("500.120.120.120") // Validation.Failure(["Invalid IP address", "Invalid hostname"])
```

```javascript
const errors = validate("john-snow", all(
    is(notBlank(), "Must not be blank"),
    is(alphaNum(), "Must contain only letters and numbers")
))

// ["Must contain only letters and numbers"]
```

## API

### Validators

#### alphaNum

`alphaNum :: () -> String -> Bool`

Accepts a string containing only Arabic numbers and Latin letters.

#### email

`email :: () -> String -> Boolean`

Accepts a valid email address.

#### equalTo

`equalsTo :: String -> String -> Boolean`

`equalsTo :: Number -> Number -> Boolean`

Passes if both values are strictly equal.

#### exactLength

`exactLength :: Number -> String -> Boolean`

`exactLength :: Number -> [*] -> Boolean`

Passes if validated value has exactly a given length.

#### greaterThan

`greaterThan :: Number -> Number -> Boolean`

Passes if validated number is greater than a given number.

#### hostname

`hostname :: () -> String -> Boolean`

Accepts a valid host name.

#### integer

`integer :: () -> String -> Boolean`

`integer :: () -> Number -> Boolean`

Accepts a valid integer value.

#### ip4

`ip4 :: () -> String -> Boolean`

Accepts a valid IPv4 address.

#### lessThan

`lessThan :: Number -> Number -> Boolean`

Passes if validated number is smaller than a given number.

#### like

`like :: RegExp -> String -> Boolean`

Passes if validated string matches a given regular expression.

#### longerThan

`longerThan :: Number -> String -> Boolean`

`longerThan :: Number -> [*] -> Boolean`

Passes if validated value is longer than a given length.

#### notBlank

`notBlank :: () -> String -> Boolean`

`notBlank :: () -> Number -> Boolean`

Passes if validated value is not blank.

#### number

`number :: () -> String -> Boolean`

`number :: () -> Number -> Boolean`

Accepts a valid number.

#### shorterThan

`shorterThan :: Number -> String -> Boolean`

`shorterThan :: Number -> [*] -> Boolean`

Passes if validated value is shorter than a given length.

#### strictFalse

`strictFalse :: () -> Boolean -> Boolean`

Accepts a strict false value.

#### strictTrue

`strictTrue :: () -> Boolean -> Boolean`

Accepts a strict false value.

#### url

`url :: () -> String -> Boolean`

Accepts a valid URL.

### Helper functions

#### is

`is :: (v -> Boolean, String) -> v -> Validation[α, β]`

Makes a function validating value `v` with a given validator function
`v -> Boolean` and returns a Folktale's [Validation](https://github.com/folktale/data.validation)
object

Example:
```javascript
const isNotBlank = is(notBlank(), "Must not be blank")

isNotBlank("foo") // Validation.Success("foo")
isNotBlank("")    // Validation.Failure(["Must not be blank"])
```

#### not

`not :: (v -> Boolean) -> v -> Boolean`

Makes a function validating value `v` with given validator but returning
an opposite result.

```javascript
const isBlank = not(notBlank());

isBlank("")    // true
isBlank("foo") // false
```

#### all

`all :: ...Validation[α, β] -> v -> Validation[γ, δ]`

Makes a function validating value `v` with any number of validators
`Validation[α, β]`. Returns `Validation.Success` if **all** of the given
validators pass or `Validation.Failure` otherwise.

#### any

`any :: ...Validation[α, β] -> v -> Validation[γ, δ]`

Makes a function validating value `v` with any number of validators
`Validation[α, β]`. Returns `Validation.Success` if **any** of the given
validators pass or `Validation.Failure` otherwise.

#### validate

`validate :: (v, v -> Validation[α, β]) -> undefined|[String]`

Validates `v` with validator `v -> Validation[α, β]` and returns
a list of errors if validation fails or `undefined` otherwise.

## License
The MIT License (MIT). Copyright (c) 2017 mirz (mirz.hq@gmail.com)


