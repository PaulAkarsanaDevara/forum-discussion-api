import { Injectable } from '@nestjs/common';
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
}
