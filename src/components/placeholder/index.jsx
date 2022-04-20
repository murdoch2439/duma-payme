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
        },3000)

    }, [])

    return(
        <>
            {
                localLoading ? <LoadingComponent />: <IssuesPage />
            }
        </>
    )
}


export default PlaceholderComponent
