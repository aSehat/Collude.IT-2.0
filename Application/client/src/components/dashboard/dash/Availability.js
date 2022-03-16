import React, { Fragment } from 'react';
import DateSelector from './DateSelector';
import AvailSelector from './AvailSelector';

export default function Availability() {
	const [date, setDate] = React.useState(new Date());
	const [valid, setValid] = React.useState();

	return (
		<div className='availability'>
			<div className='titleAvailability'>
				<h2>Availability</h2>
				<h3>Keep Your Schedule Up to Date</h3>
			</div>
			<div className='containerBox'>
				<DateSelector
					selectionType='other'
					setDate={setDate}
					setValid={setValid}
				/>
			</div>
			<Fragment>
				{valid && (
					<div className='addAvailBox'>
						<AvailSelector selectedDate={date} />
					</div>
				)}
			</Fragment>
		</div>
	);
}
