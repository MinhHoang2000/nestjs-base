import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
  versionKey: false,
})
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: false })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
