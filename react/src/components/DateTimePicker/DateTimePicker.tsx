import '@govbr-ds/core/dist/components/datetimepicker/datetimepicker.min.css';

import classNames from 'classnames';
import React, { useEffect, useImperativeHandle, useRef } from 'react';
import IMtProps from '../IMtProps';
import { useSpreadProps } from '../Util/useSpreadProps';
import { useMtProps } from '../Util/useMtProps';
import uniqueId from 'lodash.uniqueid';
import useCommonProperties from '../Util/useCommonProperties';
import useUniqueId from '../Util/useUniqueId';

export interface DateTimePickerProps extends React.HTMLAttributes<HTMLInputElement>, IMtProps {
    /** Modo do Datetime.
     * 
     * - single: uma data apenas a escolher.
     * - range: um intervalo de datas a escolher.
     */
    dataMode?: 'single' | 'range';
    /** Tipo do Datetime.
     * 
     * - text: seleciona data.
     * - time: seleciona apenas hora.
     * - datetime-local: seleciona data e hora.
     */
    dataType?: 'text' | 'time' | 'datetime-local';
    /** Label do DatetimePicker. */
    label?: string | React.ReactElement;
    /** Classe font awesome do ícone do botão. */
    buttonIcon?: string,
    /** Data mínima selecionável. */
    minDate?: string,
    /** Data máxima selecionável. */
    maxDate?: string

     /** Data máxima selecionável. */
    placeholder?: string
}

export interface DateTimePickerRef  extends HTMLInputElement {
    element: HTMLInputElement,
    wrapper: HTMLElement,
    inputWrapper: HTMLElement,
    label: HTMLElement,
    button: HTMLButtonElement
}

const DateTimePicker = React.forwardRef<DateTimePickerRef, DateTimePickerProps>(
    ({ className, id, children, dataMode = 'single', dataType = 'text', label, placeholder = 'dd/mm/aaaa', buttonIcon = 'fas fa-calendar-alt', minDate, maxDate, ...props }, ref) => {
        const fid = useUniqueId(id, 'datetimepicker_____');
        // Implementando os refs de cada um dos elementos
        const refWrapper = useRef(null);
        const refInputWrapper = useRef(null);
        const refLabel = useRef(null);
        const refElement = useRef(null);
        const refButton = useRef<HTMLButtonElement>(null);
        const refInput = useRef<HTMLInputElement>(null);
    
        useCommonProperties<DateTimePickerRef>(ref, refInput, {
            get element() {
                return refInput.current;
            },
            get wrapper() {
                return refWrapper.current;
            },
            get inputWrapper() {
                return refInputWrapper.current;
            },
            get label() {
                return refLabel.current;
            },
            get button() {
                return refButton.current;
            }
        });


        // Inicializando o datetimepicker
        useEffect(() => {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const core = require('@govbr-ds/core/dist/core-base');
            refElement.current = new core.BRDateTimePicker('br-datetimepicker', refWrapper.current, { minDate: minDate, maxDate: maxDate });
        }, [minDate, maxDate]);

        const mtProps = useMtProps(props);
        const spreadProps = useSpreadProps(props);

        return (
            <div
                className={classNames(
                    'br-datetimepicker',
                    ...mtProps,
                    className
                )}
                ref={refWrapper}
                data-mode={dataMode}
                data-type={dataType}

            >
                <div ref={refInputWrapper} className="br-input has-icon">
                    {label && <label htmlFor={fid}>{label}</label>}
                    <input
                        id={fid}
                        type={dataType}
                        placeholder={placeholder}
                        ref={refInput}
                        data-input="data-input"
                        {...spreadProps}
                    />
                    {buttonIcon && <button ref={refButton} className="br-button circle small" type="button" aria-label="Abrir Timepicker" data-toggle="data-toggle" id="timepicker-input-btn"><i className={buttonIcon} aria-hidden="true"></i>
                    </button>}
                    {children}
                </div>

            </div>
        );
    }
);

DateTimePicker.displayName = 'DateTimePicker';

export default DateTimePicker;