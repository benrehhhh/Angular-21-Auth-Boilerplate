import { AbstractControl } from '@angular/forms';

// custom validator to check tat two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
    return (group: AbstractControl) => {
        const control = group.get(controlName);
        const matchinControl = group.get(matchingControlName);

        if(!control || !matchingControl) {
            return null;
        }

        // return if another validator has already found an error on the matchinControl
        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            return null;
        }

        // set error on matchinControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true});
        } else {
            matchingControl.setErrors(null);
        }
        return null;
    }
}