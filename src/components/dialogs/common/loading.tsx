import { dialogService } from "@/services/dialogService";
import { useEffect, useRef } from "react";

export default function Loading() {
    const btnRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {

        const click = (): void => {
            btnRef.current?.click();
        };

        let step: number = 0;
        /**
         * Cause the loading animation needs time to load,
         * we need to wait for the animation to load before we can close it.
         */
        const loadingManager = (): void => {
            step++;
            if (step == 2) {
                click();
            }
        };

        const myModalEl = document.getElementById('staticBackdrop');

        const loadingController = (): { close: () => void } => {
            step = 0;
            click();

            myModalEl?.addEventListener('shown.bs.modal', loadingManager);

            return { close: loadingManager };
        };
        dialogService.loading = loadingController;

    }, []);

    return (
        <>
            <button ref={btnRef} style={{ display: "none" }} type="button" data-bs-toggle="modal" data-bs-dismiss="modal" data-bs-target="#staticBackdrop"></button>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" style={{ justifyContent: "center" }}>
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        </>
    );
}