document.addEventListener('DOMContentLoaded', function () {
  let arrayStudents = [];

  function studentFilter(fullNameFiltration, facultyFiltration, yearsEducationFiltration, yearEndingFiltration) {
    const arrayStudentsFiltered = arrayStudents.filter(student => (student.surname + student.name + student.middleName).toLowerCase().includes(fullNameFiltration)).filter(student => student.faculty.toLowerCase().includes(facultyFiltration)).filter(student => String(student.yearsEducation).includes(yearsEducationFiltration)).filter(student => String((student.yearsEducation + 4)).includes(yearEndingFiltration));

    createTable(arrayStudentsFiltered);
  }

  function sortingDateOfBirth(arrayStudentsDateOfBirthFunction) {
    let arrayStudentsSorting = arrayStudentsDateOfBirthFunction.map(studentDateOfBirth => studentDateOfBirth.dateOfBirth);
    const arrayStudentsDateOfBirth = [];
    const arrayStudentsDateOfBirthUnsorted = [];

    for (const student of arrayStudentsDateOfBirthFunction) {
      arrayStudentsDateOfBirthUnsorted.push(student);
    }

    arrayStudentsSorting.sort((a,b) => b - a);

    for (const studentDateOfBirth of arrayStudentsSorting) {
      const index = arrayStudentsDateOfBirthUnsorted.findIndex(studentsDateOfBirth => studentsDateOfBirth.dateOfBirth  === studentDateOfBirth);
      arrayStudentsDateOfBirth.push(arrayStudentsDateOfBirthUnsorted[index]);
      arrayStudentsDateOfBirthUnsorted.splice(index, 1);
    }

    createTable(arrayStudentsDateOfBirth);
  }

  function sortingYearsOfEducation(arrayStudentsYearsOfEducationFunction) {
    let arrayStudentsSorting = arrayStudentsYearsOfEducationFunction.map(studentYearsOfEducation => studentYearsOfEducation.yearsEducation);
    const arrayStudentsYearsOfEducation = [];
    const arrayStudentsYearsOfEducationUnsorted = [];

    for (const student of arrayStudentsYearsOfEducationFunction) {
      arrayStudentsYearsOfEducationUnsorted.push(student);
    }

    arrayStudentsSorting.sort();

    for (const studentYearsOfEducation of arrayStudentsSorting) {
      const index = arrayStudentsYearsOfEducationUnsorted.findIndex(studentsYearsOfEducation => studentsYearsOfEducation.yearsEducation  === studentYearsOfEducation);
      arrayStudentsYearsOfEducation.push(arrayStudentsYearsOfEducationUnsorted[index]);
      arrayStudentsYearsOfEducationUnsorted.splice(index, 1);
    }

    createTable(arrayStudentsYearsOfEducation);
  }

  function sortingFullName(arrayStudentsFullNameFunction) {
    let arrayStudentsSorting = arrayStudentsFullNameFunction.map(studentFullName => studentFullName.surname + studentFullName.name + studentFullName.middleName);
    const arrayStudentsFullName = [];
    const arrayStudentsFullNameUnsorted = [];

    for (const student of arrayStudentsFullNameFunction) {
      arrayStudentsFullNameUnsorted.push(student);
    }

    arrayStudentsSorting.sort();


    for (const studentFullName of arrayStudentsSorting) {
      const index = arrayStudentsFullNameUnsorted.findIndex(studentsFullName => (studentsFullName.surname + studentsFullName.name + studentsFullName.middleName) === studentFullName);
      arrayStudentsFullName.push(arrayStudentsFullNameUnsorted[index]);
      arrayStudentsFullNameUnsorted.splice(index, 1);
    }

    createTable(arrayStudentsFullName);
  }

  function sortingFaculty(arrayStudentsFacultyFunction) {
    let arrayStudentsSorting = arrayStudentsFacultyFunction.map(studentFaculty => studentFaculty.faculty);
    const arrayStudentsFaculty = [];
    const arrayStudentsFacultyUnsorted = [];

    for (const student of arrayStudentsFacultyFunction) {
      arrayStudentsFacultyUnsorted.push(student);
    }

    arrayStudentsSorting.sort();

    for (const studentFaculty of arrayStudentsSorting) {
      const index = arrayStudentsFacultyUnsorted.findIndex(studentsFaculty => studentsFaculty.faculty === studentFaculty);
      arrayStudentsFaculty.push(arrayStudentsFacultyUnsorted[index]);
      arrayStudentsFacultyUnsorted.splice(index, 1);
    }

    createTable(arrayStudentsFaculty);
  }

  function createTable(arrayStudentsCreate) {
    const table = document.createElement('table');
    const tr = document.createElement('tr');
    const container = document.querySelector('.container');

    const fullName = document.createElement('td');
    fullName.textContent = ('ФИО студента');
    fullName.classList.add('td-title');
    const faculty = document.createElement('td');
    faculty.textContent = ('Факультет');
    faculty.classList.add('td-title');
    const dateOfBirth = document.createElement('td');
    dateOfBirth.textContent = ('Дата рождения и возраст');
    dateOfBirth.classList.add('td-title');
    const yearsOfEducation = document.createElement('td');
    yearsOfEducation.textContent = ('Годы обучения и номер курса');
    yearsOfEducation.classList.add('td-title');

    fullName.addEventListener('click', () => {
      sortingFullName(arrayStudentsCreate);
    });

    faculty.addEventListener('click', () => {
      sortingFaculty(arrayStudentsCreate);
    });

    yearsOfEducation.addEventListener('click', () => {
      sortingYearsOfEducation(arrayStudentsCreate);
    })

    dateOfBirth.addEventListener('click', () => {
      sortingDateOfBirth(arrayStudentsCreate);
    })

    tr.append(fullName);
    tr.append(faculty);
    tr.append(dateOfBirth);
    tr.append(yearsOfEducation);
    table.append(tr);

    for(const student of arrayStudentsCreate) {
      const currentDate = new Date();
      const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
      const tr = document.createElement('tr');
      const studentDateOfBirth = student.dateOfBirth;
      const formattedStudentDateOfBirth = `${studentDateOfBirth.getDate().toString().padStart(2, '0')}.${(studentDateOfBirth.getMonth() + 1).toString().padStart(2, '0')}.${studentDateOfBirth.getFullYear()}`;
      const BirthDayInThisYear = new Date(today.getFullYear(), studentDateOfBirth.getMonth(), studentDateOfBirth.getDate());
      let age;
      const yearEnding = new Date(student.yearsEducation + 4, 08, 01);

      let courseNumber = 4 - (Math.abs(currentDate.getFullYear() - (student.yearsEducation + 4)));

      if (yearEnding < today) {
        courseNumber = 'Закончил';
      }


      age = currentDate.getFullYear() - studentDateOfBirth.getFullYear();
      if (today < BirthDayInThisYear) {
        age = age - 1;
      }

      const fullName = document.createElement('td');
      fullName.textContent = `${student.surname} ${student.name} ${student.middleName}`;
      fullName.classList.add('td');
      const faculty = document.createElement('td');
      faculty.textContent = student.faculty;
      faculty.classList.add('td');
      const dateOfBirth = document.createElement('td');
      dateOfBirth.textContent = `${formattedStudentDateOfBirth} (${age})`;
      dateOfBirth.classList.add('td');
      const yearsOfEducation = document.createElement('td');
      yearsOfEducation.textContent = `${student.yearsEducation}-${student.yearsEducation + 4} (${courseNumber})`;
      yearsOfEducation.classList.add('td')

      tr.append(fullName);
      tr.append(faculty);
      tr.append(dateOfBirth);
      tr.append(yearsOfEducation);
      table.append(tr);
    }

    table.classList.add('table')

    if(document.querySelector('.table')) {
      container.removeChild(document.querySelector('.table'));
      document.querySelector('.form-filter-student').after(table);
    }

    else {
      container.append(table);
    }
  }

  function formFilterStudent() {
    const form = document.createElement('form');
    const fieldset = document.createElement('fieldset');
    const legend = document.createElement('legend');
    const inputFullNameFilter = document.createElement('input');
    const lableInputFullNameFilter = document.createElement('lable');
    const inputFacultyFilter = document.createElement('input');
    const lableinputFacultyFilter = document.createElement('lable');
    const inputYearsEducationFilter = document.createElement('input');
    const lableYearsEducationFilter = document.createElement('lable');
    const inputYearEndingFilter = document.createElement('input');
    const lableYearEndingFilter = document.createElement('lable');
    const buttonFilterStudent = document.createElement('button');

    fieldset.classList.add('fieldset');
    legend.textContent = 'Форма фильтрации студентов';
    inputFullNameFilter.placeholder = 'Часть ФИО';
    lableInputFullNameFilter.classList.add('lable');
    lableInputFullNameFilter.textContent = 'Введите часть ФИО студента:';
    inputFacultyFilter.placeholder = 'Факультет';
    lableinputFacultyFilter.classList.add('lable');
    lableinputFacultyFilter.textContent = 'Введите часть названия факультета студента:';
    inputYearsEducationFilter.placeholder = 'Год начала обучения';
    inputYearsEducationFilter.setAttribute('type', 'number');
    inputYearsEducationFilter.setAttribute('min', '2000');
    lableYearsEducationFilter.classList.add('lable');
    lableYearsEducationFilter.textContent = 'Введите год начала обучения студента:';
    inputYearEndingFilter.placeholder = 'Последний год обучения';
    inputYearEndingFilter.setAttribute('type', 'number');
    inputYearEndingFilter.setAttribute('min', '2004');
    lableYearEndingFilter.classList.add('lable');
    lableYearEndingFilter.textContent = 'Введите последний год обучения студента:';
    buttonFilterStudent.textContent = 'Применить фильтры';
    buttonFilterStudent.classList.add('button');
    buttonFilterStudent.setAttribute('type', 'button');

    buttonFilterStudent.addEventListener('click', () => {
      studentFilter(inputFullNameFilter.value.toLowerCase(), inputFacultyFilter.value.toLowerCase(), String(inputYearsEducationFilter.value), String(inputYearEndingFilter.value));
    })

    lableInputFullNameFilter.append(inputFullNameFilter);
    lableinputFacultyFilter.append(inputFacultyFilter);
    lableYearsEducationFilter.append(inputYearsEducationFilter);
    lableYearEndingFilter.append(inputYearEndingFilter);
    fieldset.append(legend);
    fieldset.append(lableInputFullNameFilter);
    fieldset.append(lableinputFacultyFilter);
    fieldset.append(lableYearsEducationFilter);
    fieldset.append(lableYearEndingFilter);
    fieldset.append(buttonFilterStudent);
    form.append(fieldset);
    form.classList.add('form-filter-student');

    document.querySelector('.table').before(form);
  }

  function formAddStudent() {
    const form = document.createElement('form');
    const inputFullName = document.createElement('input');
    const inputFaculty = document.createElement('input');
    const inputdateOfBirth = document.createElement('input');
    const inputYearsEducation = document.createElement('input');
    const fieldset = document.createElement('fieldset');
    const legend = document.createElement('legend');
    const lableFullName = document.createElement('lable');
    const lableFaculty = document.createElement('lable');
    const lableDate = document.createElement('lable');
    const lableYearsEducation = document.createElement('label');
    const buttonAddStudent = document.createElement('button');
    const error = document.createElement('div');

    legend.textContent = 'Форма добовления нового студента';
    fieldset.classList.add('fieldset');
    inputFullName.placeholder = 'ФИО студента';
    lableFullName.textContent = 'Введите ФИО студента:';
    lableFullName.classList.add('lable');
    inputFaculty.placeholder = 'Факультет';
    lableFaculty.textContent = 'Введите факультет:';
    lableFaculty.classList.add('lable');
    inputdateOfBirth.setAttribute('type', 'date');
    inputdateOfBirth.setAttribute('min', '1990-01-01');
    inputdateOfBirth.value = '1990-01-01';
    lableDate.textContent = 'Введите дату рождения студента:';
    lableDate.classList.add('lable');
    inputYearsEducation.setAttribute('type', 'number');
    inputYearsEducation.setAttribute('min', '2000');
    inputYearsEducation.value = '2000';
    lableYearsEducation.textContent = 'Введите год начала обучения:';
    lableYearsEducation.classList.add('lable');
    buttonAddStudent.textContent = 'Добавить студента';
    buttonAddStudent.classList.add('button');
    buttonAddStudent.setAttribute('type', 'button');
    error.classList.add('error-wrap');
    form.classList.add('form-add');

    buttonAddStudent.addEventListener('click', function() {
      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
      const currentYear = currentDate.getFullYear();

      while (error.firstChild) {
        error.removeChild(error.firstChild);
      }

      if (inputFullName.value.trim() === '') {
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Поле "Введите ФИО студента:" не заполнено!';
        error.append(errorMessage);
      }

      if (inputFullName.value.split(' ').length < 3 || inputFullName.value.split(' ').length > 3) {
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Поле "Введите ФИО студента:" заполнено не корректно. Введите ФИО через пробел';
        error.append(errorMessage);
      }

      if (inputFaculty.value.trim() === '') {
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Поле "Введите факультет:" не заполнено!';
        error.append(errorMessage);
      }

      if (inputdateOfBirth.value > formattedDate) {
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Поле "Введите дату рождения студента:" превышает текущую дату!';
        error.append(errorMessage);
      }

      if (inputYearsEducation.value > currentYear) {
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Поле "Введите год начала обучения:" превышает текущий год!';
        error.append(errorMessage);
      }

      if (inputFullName.value.trim() !== '' && inputFaculty.value.trim() !== '' && inputdateOfBirth.value < formattedDate && inputYearsEducation.value <= currentYear ) {
        const student = {};
        student.surname = inputFullName.value.split(' ').filter(text => text.length > 0)[0];
        student.name = inputFullName.value.split(' ').filter(text => text.length > 0)[1];
        student.middleName = inputFullName.value.split(' ').filter(text => text.length > 0)[2];
        student.dateOfBirth = new Date(inputdateOfBirth.valueAsDate);
        student.yearsEducation = Number(inputYearsEducation.value);
        student.faculty = inputFaculty.value.trim();

        arrayStudents.push(student);

        createTable(arrayStudents);
      }


    })

    fieldset.append(legend);
    lableFullName.append(inputFullName);
    lableFaculty.append(inputFaculty);
    lableDate.append(inputdateOfBirth);
    lableYearsEducation.append(inputYearsEducation);
    fieldset.append(lableFullName);
    fieldset.append(lableFaculty);
    fieldset.append(lableDate);
    fieldset.append(lableYearsEducation);
    fieldset.append(error);
    fieldset.append(buttonAddStudent);
    form.append(fieldset);
    document.querySelector('.container').append(form);

  }

  createTable(arrayStudents);
  formAddStudent();
  formFilterStudent();
})
