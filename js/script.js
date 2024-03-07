document.addEventListener('DOMContentLoaded', function () {
    const calendarContainer = document.getElementById('calendar');
    const monthYearElement = document.getElementById('month-year');
    const noteInput = document.getElementById('note-input');
    const saveNoteButton = document.getElementById('save-note');
    const notesContainer = document.getElementById('notes-container');
    let selectedDate = null;
  
    function generateCalendar(year, month) {
      const today = new Date();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      const startingDay = (firstDay.getDay() + 6) % 7;
  
      let html = '<table>';
      html += `<tr><th colspan="7">${getMonthName(month)} ${year}</th></tr>`;
      html += '<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr><tr>';
  
      let day = 1;
      for (let i = 0; i < 42; i++) {
        if (i < startingDay || day > daysInMonth) {
          html += '<td></td>';
        } else {
          const isToday = today.getFullYear() === year && today.getMonth() === month && day === today.getDate();
          const isSelected = selectedDate && selectedDate.getFullYear() === year && selectedDate.getMonth() === month && day === selectedDate.getDate();
          const className = isToday ? 'today' : (isSelected ? 'selected' : '');
          html += `<td class="${className}">${day}</td>`;
          day++;
        }
  
        if (i % 7 === 6 && i !== 41) {
          html += '</tr><tr>';
        }
      }
  
      html += '</tr></table>';
      calendarContainer.innerHTML = html;
  
      // Add event listeners to calendar cells
      const days = document.querySelectorAll('#calendar td');
      days.forEach(day => {
        day.addEventListener('click', function () {
          const dayDate = parseInt(this.textContent);
          selectDate(year, month, dayDate);
          updateCalendar();
        });
      });
  
      highlightSelectedDay();
    }
  
    function selectDate(year, month, day) {
      selectedDate = new Date(year, month, day);
    }
  
    function updateCalendar() {
      const currentDate = new Date();
      generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
      monthYearElement.textContent = `${getMonthName(currentDate.getMonth())} ${currentDate.getFullYear()}`;
  
      if (selectedDate) {
        const selectedDateDisplay = `${getMonthName(selectedDate.getMonth())} ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`;
        monthYearElement.textContent += ` - Selected: ${selectedDateDisplay}`;
      }
  
      noteInput.value = ''; // Clear note input when a new date is selected
      displayNotes();
    }
  
    function saveNote() {
      const note = noteInput.value.trim();
      if (!note) {
        alert('Please enter a note before saving.');
        return;
      }
  
      if (!selectedDate) {
        alert('Please select a date before saving.');
        return;
      }
  
      // Save the note to a cookie
      const savedNotes = getSavedNotes();
      savedNotes.push({
        date: `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`,
        note: note
      });
      setCookie('notes', JSON.stringify(savedNotes));
  
      // Display the saved note
      displayNotes();
  
      // Clear the note input
      noteInput.value = '';
    }
  
    function getSavedNotes() {
      // Retrieve saved notes from the cookie
      const notesCookie = getCookie('notes');
      return notesCookie ? JSON.parse(notesCookie) : [];
    }
  
    function displayNotes() {
      // Retrieve saved notes and display them below the calendar
      notesContainer.innerHTML = '';
      const savedNotes = getSavedNotes();
  
      savedNotes.forEach(savedNote => {
        const noteElement = document.createElement('div');
        noteElement.textContent = `${savedNote.date}: ${savedNote.note}`;
        notesContainer.appendChild(noteElement);
      });
    }
  
    function setCookie(name, value) {
      document.cookie = `${name}=${value}; path=/`;
    }
  
    function getCookie(name) {
      const cookieMatch = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      return cookieMatch ? cookieMatch[2] : null;
    }
  
    function highlightSelectedDay() {
      const days = document.querySelectorAll('#calendar td');
      days.forEach(day => {
        const dayDate = parseInt(day.textContent);
        const isSameDay = selectedDate && dayDate === selectedDate.getDate();
        day.classList.toggle('selected', isSameDay);
      });
    }
  
    saveNoteButton.addEventListener('click', saveNote);
  
    function getMonthName(month) {
      const monthNames = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
      ];
      return monthNames[month];
    }
  
    const currentDate = new Date();
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
  
    document.getElementById('prevMonth').addEventListener('click', function () {
      currentDate.setMonth(currentDate.getMonth() - 1);
      generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    });
  
    document.getElementById('nextMonth').addEventListener('click', function () {
      currentDate.setMonth(currentDate.getMonth() + 1);
      generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
    });
  });
  