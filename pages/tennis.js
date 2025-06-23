
import { useState, useEffect } from "react";

const players = ["אורן חי", "מאור זכריה", "אייל עודד"];

const getNextMondays = (count) => {
  const dates = [];
  const today = new Date();
  let nextMonday = new Date(today);
  nextMonday.setDate(today.getDate() + ((8 - today.getDay()) % 7));
  for (let i = 0; i < count; i++) {
    const date = new Date(nextMonday);
    date.setDate(nextMonday.getDate() + i * 7);
    dates.push(date.toLocaleDateString("he-IL"));
  }
  return dates;
};

const mondays = getNextMondays(52);

export default function TennisAttendance() {
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem("tennis-attendance");
    if (saved) setAttendance(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("tennis-attendance", JSON.stringify(attendance));
  }, [attendance]);

  const handleResponse = (player, date, isComing) => {
    setAttendance((prev) => ({
      ...prev,
      [player]: {
        ...prev[player],
        [date]: isComing,
      },
    }));
  };

  return (
    <div style={{
      backgroundImage: 'url(https://images.unsplash.com/photo-1598970434795-0c54fe7c0642)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      padding: '2rem',
      fontFamily: 'Arial, sans-serif',
      color: '#fff'
    }}>
      <h1 style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '2rem' }}>
        🎾 מי מגיע לטניס ביום שני? 🇮🇱
      </h1>
      {players.map((player) => (
        <div key={player} style={{
          backgroundColor: 'rgba(255,255,255,0.15)',
          borderRadius: '2rem',
          padding: '1.5rem',
          marginBottom: '2rem',
          boxShadow: '0 0 20px rgba(0,0,0,0.5)'
        }}>
          <h2 style={{ fontSize: '2rem', color: '#ffe600' }}>{player}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {mondays.map((date) => {
              const answer = attendance[player]?.[date];
              return (
                <div key={date} style={{
                  background: '#00000055',
                  padding: '1rem',
                  borderRadius: '1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '1.2rem'
                }}>
                  <span>{date}</span>
                  <div>
                    <button onClick={() => handleResponse(player, date, true)} style={{
                      backgroundColor: '#4caf50',
                      color: '#fff',
                      marginRight: '0.5rem',
                      borderRadius: '50%',
                      width: '2.5rem',
                      height: '2.5rem',
                      fontSize: '1.2rem'
                    }}>😀</button>
                    <button onClick={() => handleResponse(player, date, false)} style={{
                      backgroundColor: '#f44336',
                      color: '#fff',
                      borderRadius: '50%',
                      width: '2.5rem',
                      height: '2.5rem',
                      fontSize: '1.2rem'
                    }}>😞</button>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: '1rem', fontSize: '1.1rem' }}>
            ✅ סה״כ הגיע: {Object.values(attendance[player] || {}).filter(v => v === true).length} |
            ❌ לא הגיע: {Object.values(attendance[player] || {}).filter(v => v === false).length}
            <br/>
            <span style={{ color: '#ccc' }}>💬 {Math.random() > 0.5 ? 'לפחות הוא מנסה...' : 'שוב הבריז? 🤨'}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
