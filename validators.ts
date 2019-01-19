import { ValidatorFn, AbstractControl } from "@angular/forms";


type ValidatorFnResult = { [key: string]: any };
type validatorBodyFunc = (value: any, ...params: any[]) => boolean;

export class MyValidators {
 
 static ValidatorFactory(validatorName: string, logic: validatorBodyFunc, ...params: any[]): ValidatorFn {
   return (control: AbstractControl): ValidatorFnResult | null => {
      if (logic(control.value, ...params)) {
        let result = {};
        result[validatorName] = { value: control.value };
 
        return result;
      }

      return null;
   };
 }
}



 


