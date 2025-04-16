/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Controller,
  Post as HttpPost,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from 'src/shared/dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly service: CommentsService) {}

  @UseGuards(AuthGuard('jwt'))
  @HttpPost()
  create(
    @Param('id') postId: number,
    @Body() body: CreateCommentDto,
    @Request() req,
  ) {
    return this.service.create({
      content: body.content,
      post: { id: postId },
      user: { id: req.user.userId },
    });
  }
}
