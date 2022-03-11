import * as React from 'react';
import isWeekend from 'date-fns/isWeekend';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';

import {Paper, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";


export const styles = makeStyles(() => ({ //define CSS for different date types
    notInThisMonthDayPaper: {
        width: "35px",
        height: "35px",
        backgroundColor: "#eeeeee",
        margin: "3px",
        boxShadow: "none",
        borderRadius: 0,
        padding: "1px",
    },
    normalDayPaper: {
        width: "35px",
        height: "35px",
        backgroundColor: "#e8f5e9",
        margin: "3px",
        boxShadow: "none",
        borderRadius: 0,
        padding: "1px",
        cursor: "pointer",
    },
    selectedDayPaper: {
        width: "31px",
        height: "31px",
        backgroundColor: "#f9fbe7",
        margin: "3px",
        boxShadow: "none",
        borderRadius: 0,
        borderStyle: "solid",
        borderWidth: "2px",
        borderColor: "lime",
        padding: "1px",
        cursor: "pointer",
    },
    todayPaper: {
        width: "35px",
        height: "35px",
        backgroundColor: "lightGreen",
        margin: "3px",
        boxShadow: "none",
        borderRadius: 0,
        padding: "1px",
        cursor: "pointer",
        color: " white",
    },}));

export default function DateSelector() {
  const [value, setValue] = React.useState(new Date());

  const today = new Date()
  const sunnyDays = [1, 6, 10, 24, 15]
  const classes = styles();

  function getDayElement(day, selectedDate, isInCurrentMonth, dayComponent) {

    const isSunny = sunnyDays.includes(day.getDate()); 
    const isSelected = day.getDate() === selectedDate;
    const isToday = day.getDate() === today.getDate() && day.getMonth() === today.getMonth();

    let dateTile
    if (isInCurrentMonth) {
        if (isSunny) {
            dateTile = (<Paper className={classes.todayPaper}>   
                {/* <Grid item>😊</Grid> */}
                {/* <Grid item><br/></Grid> */}
                  <Grid item>{day.getDate()}</Grid>
              </Paper>
            )
            
        } else {
            console.log("not sunny");
            dateTile = (
                <Paper className={isSelected ? classes.selectedDayPaper : isToday ? classes.todayPaper : classes.normalDayPaper}>   
                    <Grid item>{day.getDate()}</Grid>
                </Paper>)
        }
    } else {
        dateTile = (<Paper className={classes.notInThisMonthDayPaper}>
            <Grid item><br/></Grid>
            <Grid item style={{color: "lightGrey"}}>
                {day.getDate()}
            </Grid>
        </Paper>)
    }

    return dateTile
  }
    
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDatePicker
        orientation="landscape"
        openTo="day"
        value={value}
        showToolbar={false}
        shouldDisableDate={isWeekend}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => getDayElement(day, selectedDate, isInCurrentMonth, dayComponent)}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
