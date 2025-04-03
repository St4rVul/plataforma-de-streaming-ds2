import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findByFirebaseUid(firebaseUid: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
    create(userData: Partial<User>): Promise<User>;
    comparePassword(password: string, hash: string): Promise<boolean>;
    update(userId: string, data: Partial<User>): Promise<import("typeorm").UpdateResult>;
    updateSubscriptionStatus(userId: string, status: string): Promise<import("typeorm").UpdateResult>;
}
