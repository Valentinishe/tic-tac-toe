import { methods } from 'express-validation-map';
import { IS_REQUIRED_FIELD_TEXT_ERROR } from '@Constants/errors';


// In future, we will add more validation rules
const LoginValidationMap = {
    body: {
        username: {
           methods: {
              required: methods.isRequired,
            },
            messages: {
              required: IS_REQUIRED_FIELD_TEXT_ERROR
          }
        },
        password: {
            methods: {
                required: methods.isRequired,
            },
            messages: {
                required: IS_REQUIRED_FIELD_TEXT_ERROR,
            }
        },
    },
};

export { 
    LoginValidationMap
}