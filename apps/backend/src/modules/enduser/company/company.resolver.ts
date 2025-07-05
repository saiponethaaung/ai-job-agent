import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Company } from './model/company.model';
import { CreateCompanyArgs } from './model/create-company.mutation';
import { CompanyService } from './company.service';

@Resolver(() => Company)
export class CompanyResolver {
  constructor(private readonly service: CompanyService) {}

  @Query(() => [Company], {
    name: 'companies',
    description: 'Get all companies',
  })
  async getCompanies(): Promise<Company[]> {
    // This is a placeholder for the actual implementation.
    // In a real application, you would fetch the companies from a database or another service.
    return [];
  }

  @Mutation(() => Company, {
    name: 'createCompany',
    description: 'Create a new company',
  })
  async createCompany(
    @Args('createCompanyData') { name, website }: CreateCompanyArgs,
  ): Promise<Company> {
    const newCompany = await this.service.createCompany({
      name,
      website,
    });

    return newCompany;
  }
}
