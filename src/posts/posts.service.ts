import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/shared/entity/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly repo: Repository<Post>,
  ) {}

  create(data: Partial<Post>) {
    const newPost: Post = this.repo.create(data);
    return this.repo.save(newPost);
  }

  findAll() {
    return this.repo.find({
      relations: ['author', 'comments'],
    });
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['comments'] });
  }

  async update(id: number, data: Partial<Post>, userId: number) {
    const post = await this.repo.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!post || post.user.id !== userId) {
      throw new UnauthorizedException(
        'Anda hanya dapat mengedit postingan Anda sendiri!',
      );
    }

    Object.assign(post, data);
    return this.repo.save(post);
  }

  async delete(id: number, userId: number) {
    const post = await this.repo.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!post || post.user.id !== userId) {
      throw new UnauthorizedException(
        'Anda hanya dapat menghapus postingan Anda sendiri.',
      );
    }

    return this.repo.remove(post);
  }
}
