import React from 'react'
import { ScheduleMeeting } from "react-schedule-meeting";

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

const dateList = {
	availabilities: [
        {
            startDate: new Date(2022, 3, 15),
            endDate: new Date(2022, 3, 15),
            repeat: true,
        },
        {
            startDate: new Date(2022, 3, 16),
            endDate: new Date(2022, 3, 16),
            repeat: false,
        }
		
	],
};

// const availableTimeslots = [0, 1, 2, 3, 4, 5].map((id) => {
//     return {
//       id,
//       startTime: new Date(
//         new Date(new Date().setDate(new Date().getDate() + id)).setHours(9,0,0,0)
//       ),
//       endTime: new Date(
//         new Date(new Date().setDate(new Date().getDate() + id)).setHours(21,0,0,0)
//       )
//     };
//   });


function dateListToTimeSlots(dateList) {
    let id = 0;
    let timeSlots = [];
    for(let i = 0; i < dateList.availabilities.length; i++) {
        let slot = {};
        slot.id = id;
        id++;
        slot.startTime = dateList.availabilities[i].startDate;
        slot.endTime = dateList.availabilities[i].endDate;
        timeSlots.push(slot);

        if (dateList.availabilities[i].repeat) {
            for(let j = 1; j < 5; j++){
                let slot = {};
                slot.id = id;
                id++;
                slot.startTime = dateList.availabilities[i].startDate.addDays(j * 7);
                slot.endTime = dateList.availabilities[i].endDate.addDays(j * 7);
                timeSlots.push(slot);
            }
        }
    }
    return timeSlots;
};

const availableTimeslots = dateListToTimeSlots(dateList);

function MeetingSelector() {
  return (
    <div>
        <ScheduleMeeting
        borderRadius={10}
        primaryColor="#3f5b85"
        eventDurationInMinutes={60}
        availableTimeslots={availableTimeslots}
        onStartTimeSelect={time => console.log(time)}
        />
    </div>
  )
}

export default MeetingSelector;
