import '@govbr-ds/core/dist/components/message/message.min.css';

import classNames from 'classnames';
import React, { useEffect, useImperativeHandle, useRef } from 'react';
import IMtProps from '../IMtProps';
import { useSpreadProps } from '../Util/useSpreadProps';
import { useMtProps } from '../Util/useMtProps';
import CustomTag from '../CustomTag';
import useCommonProperties from '../Util/useCommonProperties';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const BRAlert = require('@govbr-ds/core/dist/components/message/message.js').default;

export interface MessageProps extends React.HTMLAttributes<HTMLElement>, IMtProps {
    /**
     * Categoria da mensagem.
     * 
     * - message: tipo "Mensagem". Maior e ocupa a linha inteira.
     * - feedback: tipo "Feedback". Menor e inline.
     */
    category: 'feedback' | 'message',
    /** Tipo. Vai definir a cor da mensagem.
     * 
     * - danger: vermelho
     * - success: verde
     * - info: azul
     * - warning: amarelo
     */
    type: 'danger' | 'success' | 'info' | 'warning' | string,
    /** Classe FontAwesome do ícone associado à mensagem. */
    icon?: string,
    /** Título da mensagem. */
    messageTitle?: string,
    /** Se tem ou não o botão de fechar, para o category="message". */
    hasCloseButton?: boolean
    /** Evento a ser executado ao clicar no botão de fechar */
    onCloseButtonClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined
}

const Message = React.forwardRef<HTMLElement, MessageProps>(
    ({ className, children, category, type, role = 'alert', icon, messageTitle, hasCloseButton = true, onCloseButtonClick = () => {/** */}, ...props }, ref) => {
        const mtProps = useMtProps(props);
        const spreadProps = useSpreadProps(props);
        const refWrapper = useRef<HTMLElement>(null);
        const refElement = useRef(null);
        
        useEffect(() => {
            if(refWrapper.current && !refElement.current) {
                refElement.current = new BRAlert('br-message', refWrapper.current);
            }            
        }, []);
        
        useCommonProperties<HTMLElement>(ref, refWrapper);
        
        return (
            <CustomTag
                tagName={category === 'feedback' ? 'span' : 'div'}
                ref={refWrapper}
                className={classNames(
                    (category === 'feedback' && 'feedback'),
                    (category === 'message' && 'br-message'),
                    type,
                    className,
                    ...mtProps
                )}
                {...role && { role: role }}
                {...spreadProps}

            >
                {category === 'feedback' &&
                    <>
                        {icon && <i className={icon} aria-hidden="true"></i>}
                        {children}
                    </>
                }
                {category === 'message' &&
                    <>
                        {icon && <div className="icon"><i className={icon} aria-hidden="true"></i>
                        </div>}
                        <div className="content">{messageTitle && <span className="message-title">{messageTitle}&nbsp;</span>}<span className="message-body">{children}</span></div>
                        <div className="div-close">
                            {hasCloseButton && <button className="br-button circle small" type="button" aria-label="Fechar" onClick={onCloseButtonClick} ><i className="fas fa-times" aria-hidden="true"></i>
                            </button>}
                        </div>
                        
                    </>
                }

            </CustomTag>
        );
    }
);

Message.displayName = 'Message';

export default Message;