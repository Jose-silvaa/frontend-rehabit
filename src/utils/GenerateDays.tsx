import { useState } from 'react';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const HorizontalCalendar = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const getStartOfWeek = (date: Date): Date => {
    const start = new Date(date);
    start.setDate(date.getDate() - date.getDay());
    return start;
  };

  const renderWeek = () => {
    const startOfWeek = getStartOfWeek(currentDate);

    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);

      const isToday = day.toDateString() === new Date().toDateString();

      days.push(
        <div
          key={i}
          className={`flex flex-col items-center justify-center ${
            isToday ? 'text-ButtonColor' : 'text-FontColorAuth'
          } cursor-pointer`}
        >
          <span className="text-sm font-medium">{daysOfWeek[day.getDay()]}</span>
          <span className="text-lg text-center w-14 h-16">{day.getDate()}</span>
        </div>
      );
    }

    return days;
  };

  const handlePrevWeek = () => {
    const prevDate = new Date(currentDate);
    prevDate.setDate(currentDate.getDate() - 7); // Retrocede 7 dias
    setCurrentDate(prevDate);
  };

  const handleNextWeek = () => {
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 7); // Avança 7 dias
    setCurrentDate(nextDate);
  };

  return (
    <div className="mx-auto p-4 rounded-lg mb-10">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePrevWeek}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md"
        >
          &lt;
        </button>
        <h2 className="text-lg text-white font-semibold">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <button
          onClick={handleNextWeek}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md"
        >
          &gt;
        </button>
      </div>
      <div className="flex overflow-x-auto gap-4 scrollbar-hide">
        {renderWeek()}
      </div>
    </div>
  );
};

export default HorizontalCalendar;
