import { Injectable, UnauthorizedException } from '@nestjs/common';
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
  }): Promise<Comment> {
    const comment: Comment = this.repo.create(data);
    return this.repo.save(comment);
  }

  async update(
    id: number,
    data: Partial<Comment>,
    userId: number,
  ): Promise<Comment> {
    const comment: Comment | null = await this.repo.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!comment || comment.user.id !== userId) {
      throw new UnauthorizedException(
        'Anda hanya dapat mengedit komentar Anda sendiri!',
      );
    }

    Object.assign(comment, data);

    return this.repo.save(comment);
  }

  async delete(id: number, userId: number): Promise<Comment> {
    const comment: Comment | null = await this.repo.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!comment || comment.user.id !== userId) {
      throw new UnauthorizedException(
        'Anda hanya dapat menghapus komentar Anda sendiri!',
      );
    }

    return this.repo.remove(comment);
  }
}
