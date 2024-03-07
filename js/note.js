document.addEventListener('DOMContentLoaded', function() {
    const currentDate = new Date();
  
    function updateSelectedDay(day) {
      const selectedDay = document.querySelector('.selected-day');
      if (selectedDay) {
        selectedDay.classList.remove('selected-day');
      }
  
      const isToday = currentDate.getFullYear() === currentDate.getFullYear() && currentDate.getMonth() === currentDate.getMonth() && day === currentDate.getDate();
      const selectedClassName = isToday ? 'today selected-day' : 'selected-day';
      const selectedDayElement = document.querySelector(`td[data-day="${day}"]`);
  
      if (selectedDayElement) {
        selectedDayElement.classList.add(selectedClassName);
        noteTextarea.value = getSavedNote();
      }
    }
  
    function getSavedNote() {
      const day = parseInt(document.querySelector('.selected-day').textContent, 10);
      return localStorage.getItem(`note-${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`) || '';
    }
  
    function saveNoteForDay(day, note) {
      localStorage.setItem(`note-${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`, note);
    }
  
    const calendarContainer = document.getElementById('calendar');
    calendarContainer.addEventListener('click', function(event) {
      const clickedDay = event.target.textContent;
      if (clickedDay && !isNaN(clickedDay)) {
        updateSelectedDay(parseInt(clickedDay, 10));
      }
    });
  
    const noteTextarea = document.getElementById('note');
    const saveNoteButton = document.getElementById('saveNote');
  
    saveNoteButton.addEventListener('click', function() {
      const selectedDay = document.querySelector('.selected-day');
      if (selectedDay) {
        const day = parseInt(selectedDay.textContent, 10);
        saveNoteForDay(day, noteTextarea.value);
        alert(`Note for ${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day} saved!`);
      } else {
        alert('Please select a day before saving a note.');
      }
    });
  });
  