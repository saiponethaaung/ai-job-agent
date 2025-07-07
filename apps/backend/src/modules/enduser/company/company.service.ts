import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'libs/prisma/prisma.service';

@Injectable()
export class CompanyService {
  constructor(private readonly prismaService: PrismaService) {}

  async createCompany(data: Prisma.CompanyCreateInput) {
    const url = new URL(data.website);
    data.website = url.protocol + '//' + url.host;

    const company = await this.prismaService.company.findFirst({
      where: {
        website: data.website,
      },
    });

    if (company) {
      return company;
    }

    return await this.prismaService.company.create({ data });
  }
}
