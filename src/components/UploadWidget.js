import { useEffect } from "react";
import { useRef } from "react";

const UploadWidget = ({onUpload}) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    useEffect(()=>{
        cloudinaryRef.current=window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: 'livanava',
            uploadPreset:'restaurant',
        },
        (error,result) => {
            if(result.event === "success"){
            console.log(result.info.url);
            onUpload(result.info.url);
        }
        });
    },[])
    return (
        <button type="button" onClick={()=>widgetRef.current.open()}>
            Upload
        </button>
    )
}
export default UploadWidget;