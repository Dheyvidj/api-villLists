import * as bcrypt from 'bcrypt';

export function HashPassword(): PropertyDecorator {
  return (target: object, propertyKey: string | symbol) => {
    let password: string;

    Object.defineProperty(target, propertyKey, {
      get() {
        return password;
      },
      set(newValue: string) {
        return bcrypt.hashSync(newValue, 10);
        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(newValue, saltRounds);
        password = hashedPassword;
        return hashedPassword;
      },
    });
  };
}
