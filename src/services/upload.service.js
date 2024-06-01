export const uploadService = {
    uploadImg
};

async function uploadImg(file) {
    const CLOUD_NAME = "dfptcr4ln";
    const UPLOAD_PRESET = "kgxl3dki";
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

    try {
        const formData = new FormData();
        formData.append('upload_preset', UPLOAD_PRESET);
        formData.append('file', file); // Directly using the file object

        const response = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        });
        if (!response.ok) throw new Error('Network response was not ok.');

        const imgData = await response.json();
        console.log('imgData', imgData);
        return imgData;
    } catch (err) {
        console.error('Failed to upload', err);
        throw err;
    }
}
