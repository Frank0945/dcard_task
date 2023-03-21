import { IAlert } from "@/types/dialogsTypes";

/**
 * DialogService is the interface for all dialogs,
 * the functions are replaced by the actual dialogs in /src/components/dialogs
 */
export class DialogService {
    public loading: () => { close: () => void } = () => ({ close: () => { } });
    public alert: (data: IAlert) => Promise<void> = () => new Promise((resolve) => { resolve() });
}
export const dialogService = new DialogService();