import { UserService } from "./userService";
import { useSession } from 'next-auth/react'
import { Session } from "next-auth";

class ServerService {
    public user: UserService = new UserService();
    private session: Session | null = null;

    public init(): Promise<void> {
        return new Promise<void>((resolve) => {
            if (this.session)
                resolve();

            const { data: session } = useSession();
            this.session = session;
            if (session?.accessToken)
                resolve();
        });
    }

    public getSession(): Session | null {
        return this.session;
    }

}

export const serverService = new ServerService();
