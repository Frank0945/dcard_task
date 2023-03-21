import { Session } from "next-auth";
import { serverService } from "./serverService";

export abstract class AbstractSubService {
    protected githubApi(uri: string, data?: any): Promise<any> {
        return serverService['githubApi'](uri, data);
    }
    protected getSavedSession(): Session | null {
        return serverService['getSavedSession']();
    }
}
