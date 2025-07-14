// src/pages/Appointments.jsx
import React, { useEffect, useState } from 'react';
import { listAppointments } from '../api/appointments';

export default function Appointments({ token }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAppointments() {
      setLoading(true);
      setError(null);
      try {
        const data = await listAppointments(token);
        setAppointments(data);
      } catch (err) {
        setError('Failed to load appointments');
      } finally {
        setLoading(false);
      }
    }
    fetchAppointments();
  }, [token]);

  if (loading) return <div>Loading appointments...</div>;
  if (error) return <div style={{color: 'red'}}>{error}</div>;

  return (
    <div>
      <h2>My Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>ID</th>
              <th>Doctor</th>
              <th>Date/Time</th>
              <th>Status</th>
              <th>Reason</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(app => (
              <tr key={app.id}>
                <td>{app.id}</td>
                <td>{app.doctor}</td>
                <td>{app.appointment_time}</td>
                <td>{app.status}</td>
                <td>{app.reason}</td>
                <td>{app.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
