import { Query, Resolver } from '@nestjs/graphql';
import { User } from './model/user.model';

@Resolver(() => User)
export class UserResolver {
  @Query(() => User, {
    name: 'user',
    description: 'Get the current user',
  })
  getUser(): User {
    // This is a placeholder implementation.
    // In a real application, you would fetch the user from a database or another service.
    return {
      id: '1',
      email: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      firstName: 'John',
      lastName: 'Doe',
    };
  }
}
