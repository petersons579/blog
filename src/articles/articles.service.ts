import { PrismaService } from '../prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createArticleDto: CreateArticleDto) {
    const titleIfExits = await this.prisma.article.findUnique({
      where: { title: createArticleDto.title },
    });

    if (titleIfExits)
      throw new BadRequestException(`The title ${createArticleDto.title} already exists.`);

    return this.prisma.article.create({ data: createArticleDto });
  }

  findDrafts() {
    return this.prisma.article.findMany({ where: { published: false } });
  }

  findAll() {
    return this.prisma.article.findMany({ where: { published: true } });
  }

  findOne(id: number) {
    return this.prisma.article.findUnique({ where: { id } });
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    const article = await this.findOne(id);

    if (!article) throw new NotFoundException(`Article with ${id} does not exist.`);

    return this.prisma.article.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  async remove(id: number) {
    const article = await this.findOne(id);

    if (!article) throw new NotFoundException(`Article with ${id} does not exist.`);

    return this.prisma.article.delete({ where: { id } });
  }
}
