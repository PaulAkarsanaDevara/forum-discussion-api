/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Controller,
  Post as HttpPost,
  Body,
  Param,
  UseGuards,
  Request,
  Patch,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from 'src/shared/dto/create-comment.dto';

@Controller('posts/:id/comments')
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

  @UseGuards(AuthGuard('jwt'))
  @Patch(':commentId')
  async updateComment(
    @Param('id') postId: number,
    @Param('commentId') commentId: number,
    @Body() body,
    @Request() req,
  ) {
    return this.service.update(commentId, body, req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':commentId')
  async deleteComment(@Param('commentId') commentId: number, @Request() req) {
    return this.service.delete(commentId, req.user.userId);
  }
}
