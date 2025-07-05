import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'User model' })
export class User {
  @Field(() => String, { description: 'Unique identifier for the user' })
  id: string;

  @Field(() => String, { description: 'Email for the user' })
  email: string;

  @Field(() => String, { description: 'First name for the user' })
  firstName: string;

  @Field(() => String, { description: 'Last name for the user' })
  lastName: string;

  @Field(() => Date, { description: 'Created at date for the user' })
  createdAt: Date;

  @Field(() => Date, { description: 'Updated at date for the user' })
  updatedAt: Date;
}
