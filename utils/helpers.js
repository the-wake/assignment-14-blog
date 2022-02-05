module.exports = {
  // Formats date to display correctly when passed into handlebars
  formatDate: date => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }
};
