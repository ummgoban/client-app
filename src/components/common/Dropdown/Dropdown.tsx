import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useRef,
} from 'react';

import S from './Dropdown.style';
const DropdownContext = createContext<{
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
}>({
  isOpen: false,
  toggle: () => {},
  close: () => {},
});

const Dropdown = ({children}: {children: ReactNode}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(prev => !prev);
  const close = () => setIsOpen(false);
  const dropdownRef = useRef(null);

  return (
    <DropdownContext.Provider value={{isOpen, toggle, close}}>
      <S.DropdownLayout ref={dropdownRef}>{children}</S.DropdownLayout>
    </DropdownContext.Provider>
  );
};

export const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('Dropdown 컴포넌트 안에서만 사용해야 합니다.');
  }
  return context;
};

const ToggleButton = ({children}: {children: ReactNode}) => {
  const {toggle} = useDropdownContext();

  return <S.ButtonWrapper onPress={toggle}>{children}</S.ButtonWrapper>;
};

const DropdownContainer = ({
  children,
  vertical = 'bottom',
  horizontal = 'right',
}: {
  children: ReactNode;
  horizontal?: 'right' | 'left';
  vertical?: 'top' | 'bottom';
}) => {
  const {isOpen} = useDropdownContext();
  if (!isOpen) return null;

  return (
    <S.ContentWrapper $horizontal={horizontal} $vertical={vertical}>
      {children}
    </S.ContentWrapper>
  );
};

const DropdownItem = ({
  children,
  handleClick,
  shouldClose = false,
}: {
  children: ReactNode;
  handleClick: () => void;
  shouldClose?: boolean;
}) => {
  const {close} = useDropdownContext();

  const handleItemClick = () => {
    handleClick();
    if (shouldClose) {
      close();
    }
  };

  return <S.ItemWrapper onPress={handleItemClick}>{children}</S.ItemWrapper>;
};

Dropdown.ToggleButton = ToggleButton;
Dropdown.DropdownContainer = DropdownContainer;
Dropdown.DropdownItem = DropdownItem;

export default Dropdown;
