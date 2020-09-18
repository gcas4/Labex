import { useState } from 'react'

export const useInputValue = () => {
    const [value, setValue] = useState('')

    const onChangeValue = e => {
        setValue(e.target.value)
    }

    return [value, setValue, onChangeValue]
}