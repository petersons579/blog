import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleEntity as Article } from './entities/article.entity';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('articles')
@ApiTags('Articles')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiCreatedResponse({ type: Article })
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Get('drafts')
  @ApiOkResponse({ type: Article, isArray: true })
  async findDrafts() {
    return (await this.articlesService.findDrafts()).map((article) => new Article(article));
  }

  @Get()
  @ApiOkResponse({ type: Article, isArray: true })
  async findAll() {
    return (await this.articlesService.findDrafts()).map((article) => new Article(article));
  }

  @Get(':id')
  @ApiOkResponse({ type: Article })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return new Article(await this.articlesService.findOne(id));
  }

  @Patch(':id')
  @ApiOkResponse({ type: Article })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(id, updateArticleDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Article })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.articlesService.remove(id);
  }
}
