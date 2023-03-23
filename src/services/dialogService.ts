import { IAlert, IConfirm } from "@/types/dialogsTypes";

/**
 * DialogService is the interface for all dialogs,
 * the functions are replaced by the actual dialogs in /src/components/dialogs
 */
export class DialogService {
    public loading: () => { close: () => void } = () => ({ close: () => { } });
    public alert: (data: IAlert) => Promise<void> = () => new Promise((resolve) => { resolve() });
    public confirm: (data: IConfirm) => Promise<void> = () => new Promise((resolve) => { resolve() });
    public error(msg: string): Promise<void> {
        return this.alert({ title: "Error", message: msg, confirm: "Ok" });
    }
}
export const dialogService = new DialogService();