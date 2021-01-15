export interface Modifier {
  id: string
  type: string
  options: { [name: string]: string | number | boolean }
  disabled?: boolean
}
