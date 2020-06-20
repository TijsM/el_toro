const createDateString = (day, month, year) => {
  return `${day}/${month}/${year}`;
};

const displayMessage = (text, backgroundColor = "red") => {
  messageBox = document.getElementById("popupMessage");
  messageBox.style.backgroundColor = backgroundColor;
  messageBox.innerHTML = text;

  messageBox.style.display = "block";
  setTimeout(() => {
    messageBox.style.display = "none";
  }, 7000);
};

const checkEmpty = (text, fieldName) => {
  if (text === "") {
    displayMessage(`${fieldName} mag niet leeg zijn.`);
    return false;
  }
  return true;
};

const checkValidateEmail = (mail) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  } else {
    displayMessage(`geen geldig email`);
    return false;
  }
};

const checkDate = (_day, _month, _year) => {
  const day = parseInt(_day, 10);
  const month = parseInt(_month, 10);
  const year = parseInt(_year, 10);

  console.log(day);
  console.log(month);
  console.log(year);

  if (isNaN(day) || day > 31 || day < 1) {
    displayMessage("dag moet een getal tussen 1 en 31 zijn");
    return false;
  }

  if (isNaN(month) || month > 12 || month < 1) {
    displayMessage("maand moet een getal tussen 1 en 12 zijn");
    return false;
  }

  if (isNaN(year) || year > 2020 || year < 1900) {
    displayMessage("Vul een geldig jaartal in");
    return false;
  }

  return true;
};

document
  .getElementById("kidsForm")
  .addEventListener("submit", function(event) {
    console.log('yeet')
    event.preventDefault();

    let formIsValid = true;

    const kidname = document.getElementById("kidName").value;
    const kidEmail = document.getElementById("kidEmail").value;
    const kidDay = document.getElementById("kidDay").value;
    const kidMonth = document.getElementById("kidMonth").value;
    const kidYear = document.getElementById("kidYear").value;

    !checkEmpty(kidname, "naam") ? (formIsValid = false) : null;
    !checkEmpty(kidEmail, "email") ? (formIsValid = false) : null;
    !checkEmpty(kidDay, "geboortedatum") ? (formIsValid = false) : null;
    !checkEmpty(kidMonth, "geboortedatum") ? (formIsValid = false) : null;
    !checkEmpty(kidYear, "geboortedatum") ? (formIsValid = false) : null;

    !checkValidateEmail(kidEmail) ? (formIsValid = false) : null;
    !checkDate(kidDay, kidMonth, kidYear) ? (formIsValid = false) : null;

    if(formIsValid){
      saveInAirtable("Kinderen", {
        fields: {
          Naam: kidname,
          Email: kidEmail,
          Geboortedatum: createDateString(kidDay, kidMonth, kidYear),
        },
      });

      emailjs.sendForm('gmail', 'signupretro', this);

      displayMessage('Bedankt voor de registratie!, verdere info volgt', '#065755')
    }
  });

document
  .getElementById("registerRetroButton")
  .addEventListener("click", function(event) {
    event.preventDefault();

    let formIsValid = true;

    const retroName = document.getElementById("retroName").value;
    const retroEmail = document.getElementById("retroEmail").value;
    const retroDay = document.getElementById("retroDay").value;
    const retroMonth = document.getElementById("retroMonth").value;
    const retroyear = document.getElementById("retroYear").value;
    const retroIsLocal = document.getElementById("retroIsLocal").checked;

    !checkEmpty(retroName, "naam") ? (formIsValid = false) : null;
    !checkEmpty(retroEmail, "email") ? (formIsValid = false) : null;
    !checkEmpty(retroDay, "geboortedatum") ? (formIsValid = false) : null;
    !checkEmpty(retroMonth, "geboortedatum") ? (formIsValid = false) : null;
    !checkEmpty(retroyear, "geboortedatum") ? (formIsValid = false) : null;

    !checkValidateEmail(retroEmail) ? (formIsValid = false) : null;
    !checkDate(retroDay, retroMonth, retroyear) ? (formIsValid = false) : null;

    if(formIsValid){
      saveInAirtable("Retrokoers", {
        fields: {
          Naam: retroName,
          Email: retroEmail,
          Geboortedatum: createDateString(retroDay, retroMonth, retroyear),
          Dikkelvennenaar: retroIsLocal,
        },
      });

      emailjs.sendForm('gmail', 'signupretro', this);

      displayMessage('Bedankt voor de registratie!, verdere info volgt', '#065755')
    }
  });
