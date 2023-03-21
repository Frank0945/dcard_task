import { UserService } from "./userService";
import { Session } from "next-auth";
import { getSession } from 'next-auth/react'
import { TaskService } from "./taskService";
import axios from "axios";

class ServerService {
    public user: UserService = new UserService();
    public task: TaskService = new TaskService();
    private session: Session | null = null;

    public init(): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            if (this.session)
                resolve(true);

            getSession().then((session) => {
                if (session) {
                    this.session = session;
                    resolve(true);
                }
                resolve(false);
            });
        });
    }

    public isLogin(): boolean {
        return this.session ? true : false;
    }

    private getSavedSession(): Session | null {
        return this.session;
    }

    private githubApi(uri: string, data?: any): Promise<any> {
        const githubApiUrl = 'https://api.github.com/repos/Frank0945/dcard_task';
        const headers = { Authorization: `token ${this.session?.accessToken}` };
        if (data)
            return axios.post(githubApiUrl + uri, data, { headers: headers });
        else
            return axios.get(githubApiUrl + uri);
    }
}

export const serverService = new ServerService();
