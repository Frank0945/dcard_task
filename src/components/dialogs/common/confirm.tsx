import { dialogService } from "@/services/dialogService";
import { IConfirm } from "@/types/dialogsTypes";
import { useEffect, useRef, useState } from "react";

export default function Confirm() {
    const openBtnRef = useRef<HTMLButtonElement>(null);
    const cancelBtnRef = useRef<HTMLButtonElement>(null);
    const confirmBtnRef = useRef<HTMLButtonElement>(null);
    const [dialog, setDialog] = useState<IConfirm>();

    useEffect(() => {
        const confirmController = (data: IConfirm): Promise<void> => {
            return new Promise<void>((resolve, reject) => {
                setDialog(data);
                openBtnRef.current?.click();

                cancelBtnRef?.current?.addEventListener("click", () => { reject(); });
                confirmBtnRef?.current?.addEventListener("click", () => { resolve(); });
            });
        };
        dialogService.confirm = confirmController;
    }, []);

    return (
        <>
            <button ref={openBtnRef} style={{ display: "none" }} type="button" data-bs-toggle="modal" data-bs-target="#exampleModal2"></button>
            <div className="modal fade" id="exampleModal2" tabIndex={-1} aria-labelledby="exampleModalLabel2" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel2">{dialog?.title}</h1>
                        </div>
                        {dialog?.message &&
                            <div className="modal-body">
                                {dialog?.message}
                            </div>
                        }
                        <div className="modal-footer">
                            <button ref={cancelBtnRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">{dialog?.cancel}</button>
                            <button ref={confirmBtnRef} type="button" className="btn btn-primary" data-bs-dismiss="modal">{dialog?.confirm}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}