import { User as UserModel } from '@module/user';

declare global {
  export namespace Express {
    interface User extends UserModel {}
  }
}
