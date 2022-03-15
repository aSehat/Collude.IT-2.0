import React from 'react'
import DateSelector from './DateSelector'
import AvailSelector from './AvailSelector'


export default function Availability() {

    const [date, setDate] = React.useState(new Date());
    const [valid, setValid] = React.useState();


    return (
        <div>

            <DateSelector selectionType='other' setDate={setDate} setValid={setValid}/>
            { valid && <AvailSelector selectedDate={date}/>}

        </div>
    )
}
