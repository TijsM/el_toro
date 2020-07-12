const saveInAirtable = (table, body) => {
    fetch(`https://api.airtable.com/v0/app1OzpZLbfIvdOUS/${table}`, {
      method: "POST",
      headers: {
        Authorization: "Bearer keyc66ya1KP7YoIGF",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  };