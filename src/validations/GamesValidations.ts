import { methods } from 'express-validation-map';
import { IS_REQUIRED_FIELD_TEXT_ERROR, RANGE_TURNID_TEXT_ERROR } from '@Constants/errors';


// In future, we will add more validation rules
const GameTurnValidationMap = {
    params: {
        id: {
            methods: {
               required: methods.isRequired,
             },
             messages: {
               required: IS_REQUIRED_FIELD_TEXT_ERROR
           }
         },
    },
    body: {
        turnID: {
           methods: {
              required: methods.isRequired,
              isRange: methods.isRangeNumber(0, 8)
            },
            messages: {
              required: IS_REQUIRED_FIELD_TEXT_ERROR,
              isRange: RANGE_TURNID_TEXT_ERROR
          }
        },
    },
};

export { 
    GameTurnValidationMap
}