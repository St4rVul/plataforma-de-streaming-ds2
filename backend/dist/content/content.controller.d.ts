import { ContentService } from './content.service';
import { Content } from './entities/content.entity';
export declare class ContentController {
    private contentService;
    constructor(contentService: ContentService);
    create(contentData: Partial<Content>): Promise<Content>;
    findAll(): Promise<Content[]>;
    findOne(id: string): Promise<Content>;
    update(id: string, contentData: Partial<Content>): Promise<Content>;
    remove(id: string): Promise<void>;
}
