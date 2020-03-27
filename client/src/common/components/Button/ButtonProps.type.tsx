import { PropTypes } from "@material-ui/core";

export type ButtonProps = {
    clickHandler?: () => void,
    disabled?: boolean,
    type?: any,
    attributes?: {},
    color?: PropTypes.Color,
    variant?: any,
    children?: any//string | JSX.Element
    tabindex?: string
    className?: string,
    style?: any
}