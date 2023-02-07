import { Transform } from 'class-transformer';
export const TransformId = () => Transform((val) => val.obj._id.toString());
