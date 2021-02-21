const Dates = document.querySelector('.dates'),
  year = Dates.querySelector('.year'),
  month = Dates.querySelector('.month'),
  date = Dates.querySelector('.date'),
  thisDate = new Date();
year.innerText = thisDate.getFullYear();
month.innerText = thisDate.getMonth()+1;
date.innerText = thisDate.getDate();
