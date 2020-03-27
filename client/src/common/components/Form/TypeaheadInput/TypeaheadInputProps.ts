export type TypeaheadInputProps = {
    id: string
    label: string
    keyUpHandler: (value: string) => void
    style?: { [key: string]: string | number }
    iconType?: string
    typeaheadDelay?: number
}