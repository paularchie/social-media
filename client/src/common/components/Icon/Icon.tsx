import React from 'react';
import clsx from 'clsx';

export enum IconTypes {
    Lock = 'lock'
}

export type IconProps = {
    iconType: IconTypes
    className?: string
}

const Icon = ({ iconType, className }: IconProps): JSX.Element => (
    <i
        className={clsx('material-icons', !!className && className)}
    >
        {iconType}
    </i>
);

export default Icon;