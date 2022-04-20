import React, {useEffect, useState} from 'react'
import LoadingComponent from "../loadingComponent";
import {useStateValue} from "../../context";
import IssuesPage from "../../pages/issuesPage";



const PlaceholderComponent =()=>{
    const [{   formValues   }, ] = useStateValue();
    const [localLoading, setLocalLoading] = useState(formValues.loading)

    useEffect(()=>{
        setTimeout(()=>{
            setLocalLoading(false)
            // dispatch({
            //     type: CHANGE_MODAL_STATES,
            //     key: SHOW_LOADING_COMPONENT,
            //     value:
            // })
            console.log('Happened')

        },3000)


    }, [])

    return(
        <div>
            {
                localLoading ? <LoadingComponent />: <IssuesPage />
            }

        </div>
    )
}


export default PlaceholderComponent
