export function useFormatDate() {
  const { locale } = useI18n()

  const formatter = computed(() =>
    new Intl.DateTimeFormat(locale.value, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  )

  function format(date: Date | string | number): string {
    return formatter.value.format(new Date(date))
  }

  return { format }
}
