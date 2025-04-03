import { Repository } from 'typeorm';
import { Content } from './entities/content.entity';
export declare class ContentService {
    private contentRepository;
    constructor(contentRepository: Repository<Content>);
    create(contentData: Partial<Content>): Promise<Content>;
    findAll(): Promise<Content[]>;
    findOne(id: string): Promise<Content>;
    update(id: string, contentData: Partial<Content>): Promise<Content>;
    remove(id: string): Promise<void>;
}
