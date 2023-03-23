import { Session } from "next-auth";
import { serverService } from "./serverService";

export abstract class AbstractSubService {
    protected githubApi(uri: string, action: 'get' | 'post', data?: any): Promise<any> {
        return serverService['githubApi'](uri, action, data);
    }
    protected get savedSession(): Session | null {
        return serverService['savedSession'];
    }
}
