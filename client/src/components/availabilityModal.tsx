import React, {useState} from 'react';
import '../style/availabilityModal.css';
import {IoTimeSharp} from "react-icons/io5";
import {useUserState} from "@/state/user";

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

export const AvailabilityModal = ({onClose}: any) => {
  const token = useUserState(s => s.token)
  
  const [availability, setAvailability] = useState(
    daysOfWeek.map(day => ({day, enabled: false, startTime: '08:00', endTime: '17:00'}))
  );
  
  const handleCheckboxChange = (index: any) => {
    const newAvailability = [...availability];
    newAvailability[index].enabled = !newAvailability[index].enabled;
    setAvailability(newAvailability);
  };
  
  const handleTimeChange = (index: string, type: string, value: string) => {
    const newAvailability = [...availability];
    // @ts-ignore
    newAvailability[index][type] = value;
    setAvailability(newAvailability);
  };
  
  const handleSubmit = async () => {
    const availabilityData = {
      days: availability
        .filter(day => day.enabled)
        .map(day => ({
          day: day.day,
          startTime: day.startTime,
          endTime: day.endTime
        }))
    };
    
    const jsonPayload = JSON.stringify(availabilityData);
    
    const response = await fetch('http://localhost:8000/doctors/set-availability', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: jsonPayload
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    onClose();
  };
  
  return (
    <dialog open className="modal availability-modal">
      <form className="modal-box">
        <h3 className="font-bold text-lg">Set Available Hours</h3>
        {availability.map((day, index: any) => (
          <div className="availability-row" key={day.day}>
            <input
              id={`checkbox-${day.day}`}
              type="checkbox"
              className="availability-checkbox"
              checked={day.enabled}
              onChange={() => handleCheckboxChange(index)}
            />
            <label htmlFor={`checkbox-${day.day}`} className="availability-day">{day.day}</label>
            <input
              type="time"
              className={`availability-time ${!day.enabled ? 'disabled' : ''}`}
              disabled={!day.enabled}
              value={day.startTime}
              onChange={(e) => handleTimeChange(index, 'startTime', e.target.value)}
            />
            <IoTimeSharp className="time-icon"/>
            <input
              type="time"
              className={`availability-time ${!day.enabled ? 'disabled' : ''}`}
              disabled={!day.enabled}
              value={day.endTime}
              onChange={(e) => handleTimeChange(index, 'endTime', e.target.value)}
            />
            <IoTimeSharp className="time-icon"/>
          </div>
        ))}
        <div className="modal-action">
          <button type="button" onClick={handleSubmit} className="btn save-btn">Save</button>
          <button type="button" onClick={onClose} className="btn close-btn">Close</button>
        </div>
      </form>
    </dialog>
  );
};
