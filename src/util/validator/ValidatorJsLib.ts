import * as Validator from "validatorjs";

export const validate = async (data, rules, customErrorMessages?) => {
    let validation = new Validator(data, rules, customErrorMessages);

    let passes = () => {};
    let fails = () => {};
    const validationPromisse = new Promise((resolve) => {
        passes = () => resolve(true);
        fails = () => resolve(false);
    });

    validation.checkAsync(passes, fails);

    if ((await validationPromisse) === false) {
        const errorString = Object.values(validation.errors.all()).join(", ");
        throw new Error(errorString);
    }
};
