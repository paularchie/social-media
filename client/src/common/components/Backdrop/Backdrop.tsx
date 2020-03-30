import React from 'react';

import './Backdrop.scss';
import { BackdropProps } from './BackdropProps.type';

const Backdrop = ({ showBackdrop, backdropClickHandler }: BackdropProps): JSX.Element | null => {

    return (
        showBackdrop ? <div className="backdrop" onClick={backdropClickHandler}></div> : null
    )

}
export default Backdrop;