import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [UserModule, CompanyModule],
})
export class EnduserModule {}
