import {
  Controller,
  Post as HttpPost,
  Get,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @UseGuards(AuthGuard('jwt'))
  @HttpPost()
  create(@Body() data, @Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.postService.create({
      ...data,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      author: { id: req.user.userId },
    });
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.postService.findOne(id);
  }
}
