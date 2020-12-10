import React from 'react'

export default (props) => {
    
    const options = props.lista.map((item,index)=>{
        return <option key={index} value={item.value}>{item.label}</option>
    })
     
    return (
        <select {...props}>
            {options}
        </select>
    )
}

