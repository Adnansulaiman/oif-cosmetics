import { useState } from "react"

 const useForm = (initialValue) =>{
    const [values,setValues] = useState(initialValue);

    const handleChange = (e)=>{
        const {name,value} = e.target
        setValues({...values,[name]:value})
    }

    const resetForm = () =>{
        setValues(initialValue)
    }

    return {values,handleChange,resetForm}
}
export default useForm
