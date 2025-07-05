import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCompanyArgs {
  @Field(() => String, { description: 'Company name' })
  name: string;
  
  @Field(() => String, { description: 'Company website' })
  website: string;
}
