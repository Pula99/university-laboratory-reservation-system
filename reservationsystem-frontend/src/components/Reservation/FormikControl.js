import React from 'react'
import Input from './components/Input'
import Textarea from './components/Textarea'
import Select from './components/Select'
import DatePicker from './components/DatePicker'

function FormikControl(props) {
    const {control, ...rest} = props 
    switch(control) {
        case 'input': return <Input {...rest}/>
        case 'textarea': return <Textarea {...rest}/>
        case 'select': return <Select {...rest}/>
        case 'date': return <DatePicker {...rest}/>
        default: return null
    }
}

export default FormikControl
