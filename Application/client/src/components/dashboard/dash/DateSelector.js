import * as React from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import PickersDay from '@mui/lab/PickersDay';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

const CustomPickersDay = styled(PickersDay, {
	shouldForwardProp: (prop) => prop !== 'isDateInList',
})(({ theme, isDateInList }) => ({
	...(isDateInList && {
		borderRadius: '25%',
		backgroundColor: theme.palette.primary.light,
		color: theme.palette.common.white,
		'&:hover, &:focus': {
			backgroundColor: theme.palette.primary.dark,
		},
	}),
}));

const dateList = {
	availabilities: [
		{
			date: '2022-03-23',
			repeat: true,
			availability: {
				1: '12:00PM - 2:00PM',
			},
		},
		{
			date: '2022-03-14',
			repeat: false,
			availability: {
				1: '12:00PM - 2:00PM',
			},
		},
		{
			date: '2022-03-19',
			repeat: false,
			availability: {
				1: '12:00PM - 2:00PM',
			},
		},
		{
			date: '2022-03-01',
			repeat: false,
			availability: {
				1: '12:00PM - 2:00PM',
			},
		},
		{
			date: '2022-04-12',
			repeat: false,
			availability: {
				1: '12:00PM - 2:00PM',
			},
		},
		{
			date: '2022-04-14',
			repeat: false,
			availability: {
				1: '12:00PM - 2:00PM',
			},
		},
		{
			date: '2022-04-25',
			repeat: false,
			availability: {
				1: '12:00PM - 2:00PM',
			},
		},
		{
			date: '2022-03-20',
			repeat: true,
			availability: {
				1: '12:00PM - 2:00PM',
			},
		},
		{
			date: '2022-03-25',
			repeat: true,
			availability: {
				1: '12:00PM - 2:00PM',
			},
		},
		{
			date: '2022-03-27',
			repeat: true,
			availability: {
				1: '12:00PM - 2:00PM',
			},
		},
	],
};

function parseJSONDates() {
	// Loop through dateList and return all dates
	let dates = [];
	let repeats = [null, null, null, null, null, null, null];

	for (let i = 0; i < dateList.availabilities.length; i++) {
		const dateObj = new Date(dateList.availabilities[i].date);
		dateObj.setTime(
			dateObj.getTime() + dateObj.getTimezoneOffset() * 60 * 1000
		);
		dates.push(dateList.availabilities[i].date);

		if (dateList.availabilities[i].repeat === true) {
			repeats[dateObj.getDay()] = dateObj;
		}
	}
	return [dates, repeats];
}

export default function DateSelector({ selectionType, setDate, setValid }) {
	const [value, setValue] = React.useState(new Date());
	const [dates, repeats] = parseJSONDates();

	const renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {
		let available = false;
		let disabled = false;

		// Check if the date is in the list of dates
		const isDateInList = dates.includes(date.toISOString().split('T')[0]);
		if (repeats[date.getDay()] !== null) {
			if (date > repeats[date.getDay()]) {
				available = true;
			}
		}

		if (selectionType === 'other' && !(isDateInList || available)) {
			disabled = true;
		}

		return (
			<CustomPickersDay
				{...pickersDayProps}
				disabled={disabled}
				selected={false}
				// disableMargin
				isDateInList={isDateInList || available}
			/>
		);
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<StaticDatePicker
				displayStaticWrapperAs='desktop'
				label='Week picker'
				value={value}
				onChange={(newValue) => {
					setValue(newValue);
					setDate(newValue);
					setValid(1); // TODO: make this equal to zero if you scroll to another page
				}}
				renderDay={renderWeekPickerDay}
				renderInput={(params) => <TextField {...params} />}
				inputFormat="'Week of' MMM d"
			/>
		</LocalizationProvider>
	);
}
