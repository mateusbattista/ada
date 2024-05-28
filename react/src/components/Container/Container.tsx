import '@govbr-ds/core/dist/core-base.min.css';

import classNames from 'classnames';
import React from 'react';
import IMtProps from '../IMtProps';
import { useSpreadProps } from '../Util/useSpreadProps';
import { useMtProps } from '../Util/useMtProps';

export interface ContainerProps  extends React.HTMLAttributes<HTMLDivElement>, IMtProps {
    sm?: boolean,
    md?: boolean,
    lg?: boolean,
    xl?: boolean,
    fluid?: boolean,
    main?: boolean,
} 

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
    ({className, children, main, sm, md, lg, xl, fluid, ...props}, ref) => {
        const mtProps = useMtProps(props);
        const spreadProps = useSpreadProps(props);

        const containerSuffix = 
            sm ? '-sm' :
                md ? '-md' :
                    lg ? '-lg' :
                        xl ? '-xl' :
                            fluid ? '-fluid' :
                                main ? 'main-content':
                                    '';


        return (
            <div
                ref={ref}
                className={classNames(
                    `container${containerSuffix}`,
                    ...mtProps,
                    className
                )}
                {...spreadProps}
                
            >
                {children}
            </div>
        );
    }
); 

Container.displayName = 'Container';

export default Container;