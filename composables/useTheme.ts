export const useTheme = () => {
  const isDark = useState<boolean>('isDark', () => true)

  const toggle = () => {
    isDark.value = !isDark.value
    if (import.meta.client) {
      document.documentElement.classList.toggle('dark', isDark.value)
      document.documentElement.classList.toggle('light', !isDark.value)
      localStorage.setItem('nova-theme', isDark.value ? 'dark' : 'light')
    }
  }

  const init = () => {
    if (import.meta.client) {
      const saved = localStorage.getItem('nova-theme')
      isDark.value = saved ? saved === 'dark' : true
      document.documentElement.classList.toggle('dark', isDark.value)
      document.documentElement.classList.toggle('light', !isDark.value)
    }
  }

  return { isDark, toggle, init }
}
