import React, {useEffect, useState} from 'react'
import LoadingComponent from "../loadingComponent";
import {useStateValue} from "../../context";
import IssuesPage from "../../pages/issuesPage";
import MerchantApplication from "../../pages/merchantApplication";



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
                localLoading ? <LoadingComponent />: <MerchantApplication />
            }
        </>
    )
}

export default PlaceholderComponent
