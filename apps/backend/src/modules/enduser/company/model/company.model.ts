import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Company model' })
export class Company {
  @Field(() => String, { description: 'Unique identifier for the company' })
  id: string;

  @Field(() => String, { description: 'Company name' })
  name: string;

  @Field(() => String, { description: 'Company website' })
  website: string;

  @Field(() => Date, { description: 'Created at date for the user' })
  createdAt: Date;

  @Field(() => Date, { description: 'Updated at date for the user' })
  updatedAt: Date;
}
