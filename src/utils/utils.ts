export function setShowMenu(value: boolean) {
  if (value) {
    document.body.classList.add('is-show-menu');
  } else {
    document.body.classList.remove('is-show-menu');
  }
}

export function formatNumber(input: any) {
  return input ? input.toLocaleString('en-US') : '';
}

export function getMondayOfCurrentWeek() {
  const today = new Date();
  const first = today.getDate() - today.getDay() + 1;

  const monday = new Date(today.setDate(first));
  return monday;
}

export function getSundayOfCurrentWeek() {
  const today = new Date();
  const first = today.getDate() - today.getDay() + 1;
  const last = first + 6;

  const sunday = new Date(today.setDate(last));

  return sunday;
}
