import { RegisterDto } from '../presentation/dto/register.dto';
import { LoginDto } from '../presentation/dto/login.dto';
import { RegisterResponseDto, LoginResponseDto, ProfileResponseDto } from '../presentation/dto/user-response.dto';
import { IUserService } from './user.service';
import { UserRepository } from '../infrastructure/user.repository';
export declare class UserServiceImpl implements IUserService {
    private userRepository;
    private jwtSecret;
    private jwtExpiration;
    constructor(userRepository: UserRepository);
    register(dto: RegisterDto): Promise<RegisterResponseDto>;
    login(dto: LoginDto): Promise<LoginResponseDto>;
    getProfile(userId: string): Promise<ProfileResponseDto>;
    private mapToUserResponseDto;
}
export { UserServiceImpl as UserService };
//# sourceMappingURL=user.service.impl.d.ts.map