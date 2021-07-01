
const createDateString = (day, month, year) => {
  return `${day}/${month}/${year}`;
};

const displayMessage = (text, backgroundColor = "red", duration = 7000) => {
  const messageBox = document.getElementById("popupMessage");
  messageBox.style.backgroundColor = backgroundColor;
  messageBox.innerHTML = text;

  messageBox.style.display = "block";
  setTimeout(() => {
    messageBox.style.display = "none";
  }, duration);
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

document.getElementById("newsLetterForm")
.addEventListener('submit', function(event){
  event.preventDefault()

  saveInAirtable("Emails", {
    fields: {
      Email:  document.getElementById("emailSub").value,
      DateOfSubscribing: new Date().toISOString()
    },
  });
  document.getElementById("emailSub").value = '';

  displayMessage('Bedankt voor de registratie! We houden u op de hoogte', '#065755')
})

// displayMessage('Met pijn in ons hart moeten we de editie in 2020 aflassen, volgend jaar zijn we er opnieuw bij!', "red", "15000")


document
  .getElementById("signUpForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    console.log('here')

    let formIsValid = true;

    const retroName = document.getElementById("retroName").value;
    const retroEmail = document.getElementById("retroEmail").value;
    const retroDay = document.getElementById("retroDay").value;
    const retroMonth = document.getElementById("retroMonth").value;
    const retroyear = document.getElementById("retroYear").value;
    const retroIsLocal = document.getElementById("retroIsLocal").checked;
    const isKid = document.getElementById('isKid').checked;

    // isScrolledIntoView(document.getElementById('isKid'))


    !checkEmpty(retroName, "naam") ? (formIsValid = false) : null;
    !checkEmpty(retroEmail, "email") ? (formIsValid = false) : null;
    !checkEmpty(retroDay, "geboortedatum") ? (formIsValid = false) : null;
    !checkEmpty(retroMonth, "geboortedatum") ? (formIsValid = false) : null;
    !checkEmpty(retroyear, "geboortedatum") ? (formIsValid = false) : null;

    !checkValidateEmail(retroEmail) ? (formIsValid = false) : null;
    !checkDate(retroDay, retroMonth, retroyear) ? (formIsValid = false) : null;

    console.log('iskid', isKid)

    if (formIsValid) {
      saveInAirtable("Retrokoers", {
        fields: {
          Naam: retroName,
          Email: retroEmail,
          Geboortedatum: createDateString(retroDay, retroMonth, retroyear),
          Dikkelvennenaar: retroIsLocal,
          Kinderkoers: isKid
        },
      });

      emailjs.sendForm('gmail', 'signupretro', this);
      displayMessage('Bedankt voor de registratie, bekijk uw mailbox voor meer info.', '#065755')

      document.getElementById("retroName").value = '';
      document.getElementById("retroEmail").value = ''
      document.getElementById("retroDay").value = ''
      document.getElementById("retroMonth").value = ''
      document.getElementById("retroYear").value = ''
    }
  });




