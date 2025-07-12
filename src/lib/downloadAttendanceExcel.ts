import * as XLSX from 'xlsx';

export function downloadAttendanceExcel(data: any) {
  if (!data || !data.students || !Array.isArray(data.students)) return;

  const { course_id, course_name, course_code, semester, total_sessions, students } = data;

  const allDatesSet = new Set<string>();
  students.forEach((student: any) => {
    student.attendance_records.forEach((record: any) => {
      allDatesSet.add(record.date);
    });
  });
  const allDates = Array.from(allDatesSet).sort();

  const meta = [
    ['Course ID', course_id],
    ['Course Name', course_name],
    ['Course Code', course_code],
    ['Semester', semester],
    ['Total Sessions', total_sessions],
    [''],
  ];

  const headers = ['Student ID', 'Present Count', 'Attendance %', ...allDates];

  const studentRows = students.map((student: any) => {
    const row = [
      student.insti_id,
      student.present_count,
      `${student.attendance_percentage.toFixed(2)}%`,
    ];

    const attendanceMap: Record<string, string> = {};
    student.attendance_records.forEach((record: any) => {
      attendanceMap[record.date] = record.status;
    });

    allDates.forEach(date => {
      row.push(attendanceMap[date] || 'Absent');
    });

    return row;
  });

  const sheetData = [...meta, headers, ...studentRows];

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(sheetData);
  ws['!cols'] = headers.map(h => ({ wch: h.length + 6 }));

  XLSX.utils.book_append_sheet(wb, ws, 'Attendance');
  XLSX.writeFile(wb, `${course_id}_attendance.xlsx`);
}
