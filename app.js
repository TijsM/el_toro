const createDateString = (day, month, year) => {
  return `${day}/${month}/${year}`;
};

document
  .getElementById("registerKidButton")
  .addEventListener("click", (event) => {
    console.log("yeet", event);
    event.preventDefault();

    const kidname = document.getElementById("kidName").value;
    const kidEmail = document.getElementById("kidEmail").value;
    const kidDay = document.getElementById("kidDay").value;
    const kidMonth = document.getElementById("kidMonth").value;
    const kidYear = document.getElementById("kidYear").value;

    saveInAirtable("Kinderen", {
      fields: {
        Naam: kidname,
        Email: kidEmail,
        Geboortedatum: createDateString(kidDay, kidMonth, kidYear),
      },
    });
  });

document
  .getElementById("registerRetroButton")
  .addEventListener("click", (event) => {
    console.log("yeet 2");
    event.preventDefault();

    const retroName = document.getElementById("retroName").value;
    const retroEmail = document.getElementById("retroEmail").value;
    const retroDay = document.getElementById("retroDay").value;
    const retroMonth = document.getElementById("retroMonth").value;
    const retroyear = document.getElementById("retroYear").value;
    const retroIsLocal = document.getElementById("retroIsLocal").checked;

    saveInAirtable("Retrokoers", {
      fields: {
        Naam: retroName,
        Email: retroEmail,
        Geboortedatum: createDateString(retroDay, retroMonth, retroyear),
        Dikkelvennenaar: retroIsLocal
      },
    });
  });
