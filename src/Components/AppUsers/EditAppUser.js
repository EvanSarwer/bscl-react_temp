import AppUserForm from "./AppUserForm";
import { useParams } from "react-router-dom";
const EditAppUser=()=>{
    const {id} = useParams();
    return (
            <AppUserForm mode="Edit" id={id}/>
    )
}
export default EditAppUser;