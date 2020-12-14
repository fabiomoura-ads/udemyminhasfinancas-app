import React from 'react'

const SelectMenu = props => {
    
    const options = props.lista.map((item,index)=>{
        return <option key={index} value={item.value}>{item.label}</option>
    })
     
    return (
        <select {...props}>
            {options}
        </select>
    )
}

export default SelectMenu;
