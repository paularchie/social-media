import React from 'react';
import './Card.scss';
import clsx from 'clsx';

const Card = ({ className, children }): any => {
    return (
        <div className={clsx('card', { [className]: !!className })}>
            {children}
        </div>
    )
}
export default Card;