import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, Modal, Box } from '@mui/material';
import styles from '../styles/AvailSelector.module.css';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function formatAMPM(time24) {
    var tmpArr = time24.split(':'), time12;
    if(+tmpArr[0] === 12) {
        time12 = tmpArr[0] + ':' + tmpArr[1] + ' PM';
    } else {
        if(+tmpArr[0][0] === 0 && +tmpArr[0][1] === 0) {
            time12 = '12:' + tmpArr[1] + ' AM';
        } else {
            if(+tmpArr[0] > 12) {
                time12 = (+tmpArr[0]-12) + ':' + tmpArr[1] + ' PM';
            } else {
                time12 = (+tmpArr[0]) + ':' + tmpArr[1] + ' AM';
            }
        }
    }
    return time12;
}


const AvailSelector = ({selectedDate}) => {

    const [open, setOpen] = React.useState(false);
    const [timeList, setTimeList] = React.useState([]);

    const [startTime, setStartTime] = React.useState("00:00");
    const [endTime, setEndTime] = React.useState("23:59");

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const updateStartTime = ({target}) => {
        console.log(startTime);
        setStartTime(target.value);
    }

    const updateEndTime = ({target}) => {
        setEndTime(target.value);
    }

    const handleClick = () => {
        console.log("val", startTime);
        setTimeList(timeList => timeList.concat(formatAMPM(startTime) + ' - ' + formatAMPM(endTime)));
        handleClose()
    }

    const submitHandler = e =>{
        e.preventDefault()
    }

    return (
        <div>

        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <form onSubmit={submitHandler} className={styles.timeContainer} noValidate>
                    <TextField
                        id="time"
                        label="Start Time"
                        type="time"
                        defaultValue={startTime}
                        onChange={updateStartTime}
                        className={styles.timeField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 300, // 5 min
                        }}
                    />

                    <TextField
                        id="time"
                        label="End Time"
                        type="time"
                        defaultValue={endTime}
                        onChange={updateEndTime}
                        className={styles.timeField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            step: 300, // 5 min
                        }}
                    />
                    <Button onClick={handleClick} variant="contained" color="primary">SUBMIT</Button>

                </form>
                <h1>
                    date: {selectedDate.getDate()}
                </h1>
            </Box>
        </Modal>

        <div>
            {timeList.map((time) => {
                return <div key={time}>{time}</div>;
            })}
        </div>

        {
            selectedDate.getDate() > 0 &&
            <Button onClick={handleOpen} variant="text">+ ADD AVAILABILITY</Button>}
        </div>

    );
}

export default AvailSelector;