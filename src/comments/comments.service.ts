import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/shared/entity/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private readonly repo: Repository<Comment>,
  ) {}

  create(data: {
    content: string;
    post: { id: number };
    user: { id: number };
  }) {
    const comment = this.repo.create(data);
    return this.repo.save(comment);
  }
}
