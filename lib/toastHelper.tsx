import toast from "react-hot-toast";

const toastHelper = (status:boolean,message:string,successMessage?:string,errorMessage?:string) => {
    if(status){
        if(!successMessage){
        toast.success(message);
        }
        if(successMessage){
            toast.success(successMessage);
        }
    }
    else{
        if(!errorMessage){
        toast.error(message);
        }
        if(errorMessage){
            toast.error(errorMessage);
        }
    }
}

export default toastHelper;