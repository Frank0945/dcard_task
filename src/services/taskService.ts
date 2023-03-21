import { AbstractSubService } from './abstractSubService';

export class TaskService extends AbstractSubService {

    public postTask(
        title: string,
        content: string
    ): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.githubApi('/issues', { title: title, body: content }).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            });
        });
    }
}
