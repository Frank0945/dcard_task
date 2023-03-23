import { dialogService } from "@/services/dialogService";
import { IAlert } from "@/types/dialogsTypes";
import { useEffect, useRef, useState } from "react";

export default function Alert() {
    const openBtnRef = useRef<HTMLButtonElement>(null);
    const closeBgRef = useRef<HTMLDivElement>(null);
    const closeBtnRef = useRef<HTMLButtonElement>(null);
    const [dialog, setDialog] = useState<IAlert>();

    useEffect(() => {
        const alertController = (data: IAlert): Promise<void> => {
            return new Promise<void>((resolve) => {
                setDialog(data);
                openBtnRef.current?.click();

                closeBgRef?.current?.addEventListener("click", () => { resolve(); });
                closeBtnRef?.current?.addEventListener("click", () => { resolve(); });
            });
        };
        dialogService.alert = alertController;
    }, []);

    return (
        <>
            <button ref={openBtnRef} style={{ display: "none" }} type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"></button>
            <div ref={closeBgRef} className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">{dialog?.title}</h1>
                        </div>
                        <div className="modal-body">
                            {dialog?.message}
                        </div>
                        <div className="modal-footer">
                            <button ref={closeBtnRef} type="button" className="btn btn-primary" data-bs-dismiss="modal">{dialog?.confirm}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}