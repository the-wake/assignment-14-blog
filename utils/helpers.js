// I couldn't get this to work at first, so I made my own. Then I realized I had a typo in my requirement. But mine also allows for time so I think I'll keep it.

module.exports = {
  // Formats date to display correctly when passed into handlebars
  setDate: date => {
    dateString = JSON.stringify(date);
    noQuotes = dateString.split('"');
    splitString = noQuotes[1].split('T');
    secondSplit = splitString[1].split('.');
    return (`${splitString[0]}, ${secondSplit[0]}`);
  },
  formatDate: date => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }
};
