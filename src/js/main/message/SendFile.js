import Request from "@/utils/Request.js";
export const sendAudio = async (file) => {
    await Request({
        url: "/file/audio/upload",
        method: "post",
        data: file,
        headers: {
            "Content-Type": "multipart/form-data"
        },
        name: "audio"
    })
}