import { UserService } from "./userService";
import { Session } from "next-auth";
import { getSession } from 'next-auth/react'

class ServerService {
    public user: UserService = new UserService();
    private session: Session | null = null;

    public init(): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            if (this.session)
                resolve(true);

            getSession().then((session) => {
                console.log(session);

                if (session) {
                    this.session = session;
                    resolve(true);
                }
                resolve(false);
            });
        });
    }

    public getSession(): Session | null {
        return this.session;
    }
}

export const serverService = new ServerService();
