export default function formatMoney(money) {
  if (!money) return ''

  return money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
