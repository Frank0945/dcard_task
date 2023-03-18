import { IUser } from '@/types/user';
import { serverService } from './serverService';

export class UserService {

    public getUser(): IUser {
        const session = serverService.getSession();
        const user = {
            name: session?.user?.name as string,
            picture: session?.user?.image as string,
        };
        return user;
    }
}
