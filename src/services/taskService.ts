import { IListTask } from '@/types/taskTypes';
import { AbstractSubService } from './abstractSubService';

export class TaskService extends AbstractSubService {

    public postTask(
        title: string,
        content: string
    ): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.githubApi('/issues', 'post', { title: title, body: content, labels: ["in progress"] }).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    public listTasks(data: IListTask): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.githubApi('/issues', 'get', Object.assign(data, { per_page: 10 })).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            });
        });
    }
}
