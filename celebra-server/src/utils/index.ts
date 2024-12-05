import {
  registerDecorator,
  ValidationOptions,
  isEmail,
  isPhoneNumber,
  ValidationArguments,
} from 'class-validator';

export function IsRg(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isRg',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string) {
          const rgRegex = /^(\d{1,2})\.?(\d{3})\.?(\d{3})\-?(\d{1})$/;
          return rgRegex.test(value);
        },
        defaultMessage() {
          return 'Invalid rg';
        },
      },
    });
  };
}

export function IsEmailOrPhoneNumber() {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isEmailOrPhoneNumber',
      target: object.constructor,
      propertyName: propertyName,
      validator: {
        validate(value: any) {
          return isPhoneNumber(value, 'BR') || isEmail(value);
        },

        defaultMessage(args: ValidationArguments) {
          return `${args.property} deve ser um e-mail ou um telefone`;
        },
      },
    });
  };
}

export function IsCNPJ() {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isCNPJ',
      target: object.constructor,
      propertyName: propertyName,
      validator: {
        validate(value: string) {
          const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
          return cnpjRegex.test(value);
        },

        defaultMessage(args: ValidationArguments) {
          return `${args.property} deve ser um CNPJ`;
        },
      },
    });
  };
}
