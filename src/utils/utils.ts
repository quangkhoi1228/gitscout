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
