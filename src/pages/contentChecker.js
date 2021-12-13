import React,{useState, useEffect} from 'react'
import LoadingComponent from "../components/loadingComponent";
import LayoutManager from "./layoutManager";
import {useStateValue} from "../context";



const ContentChecker = () =>{
    const [{ formValues },] = useStateValue();
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        starter()
        console.log('currency0000 ===>', formValues.currency)
    },[])

    const starter = () =>{
        if(formValues.currency){
            console.log('currency0000 ===>', formValues.currency)
        setLoading(false)
        }

    }
    return(
        <div style={{height:500, with:500}}>
            {
            loading ?
                <LoadingComponent />:
                <LayoutManager />
        }
        </div>

    )
}

export default ContentChecker
