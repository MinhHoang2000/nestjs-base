import { RouteTree } from '@nestjs/core';
import { UserModule } from './modules/user/user.module';

export const routes: RouteTree[] = [
  {
    path: `/user`,
    module: UserModule,
  },
];
