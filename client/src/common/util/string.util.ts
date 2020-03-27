import { compose } from "./compose.util";

const toString = (v: any) => v.toString();
const toLowerCase = (v: string) => v.toLowerCase()

export const toLowerCaseString = compose(toLowerCase, toString);