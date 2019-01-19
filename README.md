# Validators Factory


Writing a custom validator can be a very boring operation, especially when form and validations become more complex. So, I wrote my ValidatorFactory to help me write custom validators without having to remember the syntax of Angular!

Here is the ValidatorsFactory:

```
import { ValidatorFn, AbstractControl } from "@angular/forms";

// type definition for ValidatorsFactory
type ValidatorFnResult = { [key: string]: any };
type validatorBodyFunc = (value: any, ...params: any[]) => boolean;

export class MyValidators {
 
 static ValidatorFactory(validatorName: string, logic: validatorBodyFunc, ...params: any[]): ValidatorFn {
   return (control: AbstractControl): ValidatorFnResult | null => {
      if (logic(control.value, ...params)) {
        let result = {};
        result[validatorName] = { value: control.value };
 
        return result;

        // return this object: {validatorName:
                                {
                                  value: control.value
                                }
                              }
      }

      return null;
   };
 }
}
```

## Custom validator 

With ValidatorFactory, creating a custom validator is simple. We just have to write the function that implement the logic of validator. Such function is of type `validatorBodyFunc`:

```
type validatorBodyFunc = (value: any, ...params: any[]) => boolean;
```

This function accept a `value` (to capture the value by the AbstractControl) and optional paramaters `params`, based on the validation logic you are implementing. Thus, we write our custom validator:

```
// BANNEDNAMEVALIDATOR
// the validatorBodyFunc
export function bannedNameBody(value: any, ...params: any[]): boolean {
  return (value === params[0]) ? true : false;
}
 
// the custom validator based on bannedNameBody logic
export const bannedNameValidator = Validators.ValidatorFactory('bannedname', bannedNameBody, 'John');
```

or an ageRangeValidator:

```
// AGERANGEVALIDATOR
// the validatorBodyFunc
export function ageRangeBody(value: any, ...params: any[]): boolean {
  return (value >= params[0] && value <= params[1]) ? false : true;
}
 
// the custom validator based on ageRangeBody logic
export const ageRangeValidator = Validators.ValidatorFactory('agerange', ageRangeBody, 20, 50);
```

That's all!


## Using into form
Now, you can use it in your form validation:

```
this.myForm = this._fb.group({
   name: [this.entity.name, [Validators.required, bannedNameValidator]],
   age: [this.entity.age, [ageRangeValidator]]
 });
```


Enjoy it!




