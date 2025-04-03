import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content } from './entities/content.entity';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
  ) {}

  async create(contentData: Partial<Content>): Promise<Content> {
    const content = this.contentRepository.create(contentData);
    return this.contentRepository.save(content);
  }

  async findAll(): Promise<Content[]> {
    return this.contentRepository.find();
  }

  async findOne(id: string): Promise<Content> {
    return this.contentRepository.findOne({ where: { id } });
  }

  async update(id: string, contentData: Partial<Content>): Promise<Content> {
    await this.contentRepository.update(id, contentData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.contentRepository.delete(id);
  }
} 