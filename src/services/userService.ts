import { IUser } from '@/types/userTypes';
import { AbstractSubService } from './abstractSubService';
export class UserService extends AbstractSubService {

    public getUser(): IUser {
        const session = this.getSavedSession();
        const user = {
            name: session?.user?.name as string,
            picture: session?.user?.image as string,
        };
        return user;
    }
}
