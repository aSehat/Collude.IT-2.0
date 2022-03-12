import * as React from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import PickersDay from '@mui/lab/PickersDay';

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== 'dayIsBetween',
})(({ theme, dayIsBetween, isFirstDay}) => ({
  ...(dayIsBetween && {
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.dark,
    },
  })
  // ...(isFirstDay && {
  //   borderTopLeftRadius: '50%',
  //   borderBottomLeftRadius: '50%',
  //   borderTopRightRadius: '50%',
  //   borderBottomRightRadius: '50%'
  // }),
}));

const dateList = {
  'availabilities' : [
    {
      'date': '2022-03-24', 
      'availability': {
        '1': '12:00PM - 2:00PM'
      },
    },
    {
      'date': '2022-03-25', 
      'availability': {
        '1': '12:00PM - 2:00PM'
      },
    },
    {
      'date': '2022-03-26', 
      'availability': {
        '1': '12:00PM - 2:00PM'
      }
    }
  ]
};

function parseJSON() {
  // Loop through dateList and return all dates
  let dates = [];
  for (let i = 0; i < dateList.availabilities.length; i++) {
    dates.push(dateList.availabilities[i].date);
  }
  return dates;
}

export default function DateSelector(selectionType) {
  const [value, setValue] = React.useState(new Date());

  const renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {

    const date1 = new Date("Thu Mar 24 2022 21:28:21 GMT-0400 (Eastern Daylight Time)");

    // console.log("getdate", date1,);

    // if (date1.getDate() === value.getDate()) {
    //   console.log("date1", date1);
    // }

    // Check if the date is in the list of dates
    const isDateInList = parseJSON().includes(date.toISOString().split('T')[0]);

    console.log(isDateInList);

    // const start = startOfWeek(value);
    // const end = endOfWeek(value);

    // const dayIsBetween = isWithinInterval(date, { start, end });
    let isFirstDay = false;
    // const isLastDay = isSameDay(date, end);

    if (isDateInList) {
      isFirstDay = true;
    }

    // // console.log("date: " + value);
    // // console.log("pickersDayProps: " + pickersDayProps);
    // // console.log("selectedDates: " + selectedDates);

    // if (!value) {
    //   return <PickersDay {...pickersDayProps} />;
    // }

    // const start = startOfWeek(value);
    // const end = endOfWeek(value);

    // const dayIsBetween = isWithinInterval(date, { start, end });
    // const isFirstDay = isSameDay(date, start);
    // const isLastDay = isSameDay(date, end);

    return (
      <CustomPickersDay
        {...pickersDayProps}
        disableMargin
        dayIsBetween={isFirstDay}
      />
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        label="Week picker"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderDay={renderWeekPickerDay}
        renderInput={(params) => <TextField {...params} />}
        inputFormat="'Week of' MMM d"
      />
    </LocalizationProvider>
  );
}