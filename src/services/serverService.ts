import { UserService } from "./userService";
import { Session } from "next-auth";
import { getSession } from 'next-auth/react'
import { TaskService } from "./taskService";
import axios from "axios";
class ServerService {

    public user: UserService = new UserService();
    public task: TaskService = new TaskService();

    private session: Session | null = null;
    private hostTime: number = Date.now();
    private localStartTime: number = Date.now();

    constructor() {
        this.getHostTime().then((time) => {
            this.hostTime = time;
        });
    }

    public setSession(session: Session): void {
        this.session = session;
    }

    public get serverTime(): number {
        return this.hostTime + Date.now() - this.localStartTime;
    }

    private get getSession(): Session | null {
        return this.session;
    }

    private githubApi(uri: string, action: 'get' | 'post', data?: any): Promise<any> {
        const githubApiUrl = 'https://api.github.com';
        const headers = { Authorization: `token ${this.session?.accessToken}` };
        if (action === 'post')
            return axios.post(githubApiUrl + uri, data, { headers: headers });
        else
            return axios.get(githubApiUrl + uri, { params: data });
    }

    private getHostTime(): Promise<number> {
        return new Promise<number>((resolve) => {
            const severUrl = typeof window === 'undefined' ? 'https://dcard-task.vercel.app' : 'http://localhost:3000';
            axios.get(severUrl + '/api/time').then((res: any) => {
                resolve(res.data.hostTime);
            });
        });
    }
}
export const serverService = new ServerService();
