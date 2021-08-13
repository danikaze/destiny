import clsx from 'clsx';
import { ReactNode, FC, MouseEvent, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import styles from './modal.module.scss';

export type Props = {
  header?: ReactNode;
  onClose: () => void;
  closeOnKeys?: string[];
  className?: string;
};

export const Modal: FC<Props> = ({
  onClose,
  closeOnKeys,
  header,
  children,
  className,
}) => {
  const [container, setContainer] = useState<HTMLElement | undefined>();

  useEffect(() => {
    const keyHandler = (event: KeyboardEvent) => {
      if (closeOnKeys?.includes(event.key)) {
        onClose();
      }
    };
    const portalContainer = getPortalContainer();
    document.addEventListener('keydown', keyHandler);
    document.addEventListener('click', onClose);
    setContainer(portalContainer);

    return () => {
      portalContainer.parentElement?.removeChild(portalContainer);
      document.removeEventListener('keydown', keyHandler);
      document.removeEventListener('click', onClose);
      setContainer(undefined);
    };
  }, []);

  if (!container) return null;

  const contents = (
    <div className={clsx(styles.paper, className)} onClick={stopPropagation}>
      {renderHeader(header)}
      {children}
    </div>
  );

  return createPortal(contents, container);
};

Modal.defaultProps = {
  closeOnKeys: ['Escape'],
};

function renderHeader(header?: ReactNode): JSX.Element | null {
  if (!header) return null;
  return (
    <div className={styles.header}>
      <h4>{header}</h4>
    </div>
  );
}

function stopPropagation(event: MouseEvent) {
  event.stopPropagation();
}

function getPortalContainer() {
  const container = document.createElement('div');
  container.className = styles.backdrop;
  document.body.appendChild(container);
  return container;
}
