// src/components/AppointmentForm.jsx
import React, { useState } from 'react';

export default function AppointmentForm({ onSubmit, initialData = {}, doctors = [] }) {
  const [doctor, setDoctor] = useState(initialData.doctor || '');
  const [appointment_time, setAppointmentTime] = useState(initialData.appointment_time || '');
  const [reason, setReason] = useState(initialData.reason || '');
  const [duration, setDuration] = useState(initialData.duration || 30);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!doctor || !appointment_time) {
      setError('Doctor and time are required');
      return;
    }
    setError('');
    onSubmit({ doctor, appointment_time, reason, duration });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Doctor:
        <select value={doctor} onChange={e => setDoctor(e.target.value)} required>
          <option value="">Select Doctor</option>
          {doctors.map(d => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
      </label>
      <label>Date/Time:
        <input type="datetime-local" value={appointment_time} onChange={e => setAppointmentTime(e.target.value)} required />
      </label>
      <label>Reason:
        <input type="text" value={reason} onChange={e => setReason(e.target.value)} />
      </label>
      <label>Duration (minutes):
        <input type="number" value={duration} onChange={e => setDuration(e.target.value)} min={1} />
      </label>
      <button type="submit">Save Appointment</button>
      {error && <div style={{color:'red'}}>{error}</div>}
    </form>
  );
}
