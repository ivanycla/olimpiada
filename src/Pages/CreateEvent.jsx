import OrgForm from "../comp/UI/OrgForm/OrgFrom"
import styles from "../styles/ProfileOrg.module.css"

export default function CreateEvent(){
    const handleCreate= () =>{
                    alert("Отправляем на сервер ")
    }

    return (
        <div style={{marginTop: "50px"}}>
            <OrgForm
            onSubmit={handleCreate}
        />
      </div>
    )
}