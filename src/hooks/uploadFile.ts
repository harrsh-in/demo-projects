import { useState } from "react";
import axios, { AxiosProgressEvent } from "axios";

export const useUploadForm = (url: string) => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [size, setSize] = useState(0);
    const [progress, setProgress] = useState(0);

    const uploadForm = async (formData: FormData) => {
        await axios.post(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent;
                let percent = 0;
                if (total) {
                    percent = Math.floor((loaded * 100) / total);
                    console.log(`${loaded}kb of ${total}kb | ${percent}%`);
                    console.log(
                        `${Math.round(loaded * 0.000001 * 100) / 100}mb of ${
                            Math.round(total * 0.000001 * 100) / 100
                        }mb | ${percent}%`
                    );
                    setSize(Math.round(loaded * 0.000001 * 100) / 100);
                } // just to see whats happening in the console

                if (percent <= 100) {
                    setProgress(percent); // hook to set the value of current level that needs to be passed to the progressbar
                }
            },
        });
        setIsSuccess(true);
    };

    return { uploadForm, isSuccess, progress, size };
};
