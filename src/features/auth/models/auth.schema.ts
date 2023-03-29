import { hash, compare } from 'bcryptjs';
import { IAuthDocument } from '@auth/interfaces/auth.interface';
import { model, Model, Schema } from 'mongoose';
import { config } from '@configs/configEnvs';

// Design Pattern AAA / Security for Design (SBD): https://www.ticportal.es/glosario-tic/seguridad-diseno-sbd
const authSchema: Schema = new Schema(
  {
    username: { type: 'String' },
    uId: { type: 'String' },
    email: { type: 'String' },
    password: { type: 'String' },
    avatarColor: { type: 'String' },
    createdAt: { type: Date, default: Date.now() }
  },
  {
    toJSON: {
      transform(_doc, ret) {
        delete ret.password;
        return ret;
      }
    }
  }
);

// virtual methods / spaces methods
authSchema.pre('save', async function (this: IAuthDocument, next: () => void) {
  const hashedPassword: string = await hash(this.password as string, Number(config.SALT_ROUND));
  this.password = hashedPassword;
  next();
});

authSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  const hashedPassword: string = (this as IAuthDocument).password!;
  return compare(password, hashedPassword);
};

authSchema.methods.hashPassword = async function (password: string): Promise<string> {
  return hash(password, Number(config.SALT_ROUND));
};

const AuthModel: Model<IAuthDocument> = model<IAuthDocument>('Auth', authSchema, 'Auth');
export { AuthModel };
