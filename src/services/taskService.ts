import { IListTask } from '@/types/taskTypes';
import { AbstractSubService } from './abstractSubService';

export class TaskService extends AbstractSubService {

    private repo = 'Frank0945/dcard_task';

    public postTask(
        title: string,
        content: string
    ): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.githubApi(
                `/repos/${this.repo}/issues`,
                'post',
                { title: title, body: content, labels: ["open"] }
            ).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    public changeTaskStatus(
        id: number,
        status: IListTask["label"]
    ): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.githubApi(
                `/repos/${this.repo}/issues/` + id,
                'post',
                { labels: [status] }
            ).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    public deleteTask(id: number): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.githubApi(
                `/repos/${this.repo}/issues/` + id,
                'post',
                { state: "closed" }
            ).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    public listTasks(data: IListTask): Promise<any> {
        return new Promise<any>((resolve, reject) => {

            const listData = {
                q: `repo:${this.repo} is:open is:issue sort:created-${data.order}`,
                per_page: 10,
                page: data.page,
            }

            if (data.q)
                listData.q += ' ' + data.q;

            if (data.label)
                listData.q += ' label:"' + data.label + '"';

            this.githubApi(
                '/search/issues',
                'get',
                listData
            ).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            });
        });
    }

}
