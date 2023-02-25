import React, { useState } from "react";
import { useUploadForm } from "./hooks/uploadFile";

interface PostData {
    image: File | null;
}

const App = () => {
    const [formValues, setFormValues] = useState<PostData>({
        image: null,
    });

    const { isSuccess, uploadForm, progress, size } = useUploadForm(
        "https://salon.server.harrsh.com/api/v1/get-file-upload-link"
    );

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues((prevFormValues) => ({
            ...prevFormValues,
            image: event.target.files ? event.target.files[0] : null,
        }));
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formValues.image && formData.append("image", formValues.image);
        return await uploadForm(formData);
    };

    return (
        <div>
            {isSuccess}
            {progress}
            <input type="file" name="" id="" onChange={handleImageChange} />
            <button onClick={handleSubmit}>Submit</button>
            {size}MB
        </div>
    );
};

export default App;
