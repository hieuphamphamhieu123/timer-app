// src/utils/chartUtils.js

/**
 * Lấy dữ liệu 7 ngày gần nhất
 * @param {Array} sessions - Danh sách sessions
 * @returns {Object} - Data cho chart
 */
export const getLast7DaysData = (sessions) => {
  const today = new Date();
  const last7Days = [];
  const labels = [];
  const data = [];

  // Tạo mảng 7 ngày gần nhất
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    last7Days.push(date.toDateString());
    
    // Label: "Mon", "Tue", ...
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    labels.push(dayName);
  }

  // Đếm số sessions cho mỗi ngày
  last7Days.forEach((dateStr) => {
    const count = sessions.filter(session => 
      new Date(session.date).toDateString() === dateStr
    ).length;
    data.push(count);
  });

  return { labels, data };
};

/**
 * Lấy tổng phút làm việc theo tuần
 * @param {Array} sessions - Danh sách sessions
 * @returns {number} - Tổng phút
 */
export const getTotalMinutesThisWeek = (sessions) => {
  const today = new Date();
  const firstDayOfWeek = new Date(today);
  firstDayOfWeek.setDate(today.getDate() - today.getDay());

  return sessions
    .filter(s => new Date(s.date) >= firstDayOfWeek)
    .reduce((total, s) => total + s.duration, 0);
};

/**
 * Lấy streak (chuỗi ngày liên tiếp)
 * @param {Array} sessions - Danh sách sessions
 * @returns {number} - Số ngày streak
 */
export const getCurrentStreak = (sessions) => {
  if (sessions.length === 0) return 0;

  const today = new Date().toDateString();
  let streak = 0;
  let checkDate = new Date();

  while (true) {
    const dateStr = checkDate.toDateString();
    const hasSession = sessions.some(s => 
      new Date(s.date).toDateString() === dateStr
    );

    if (hasSession) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else if (dateStr === today) {
      // Hôm nay chưa có session, kiểm tra hôm qua
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
};