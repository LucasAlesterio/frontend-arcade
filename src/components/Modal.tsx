import React, { useState } from "react";
import { TbX } from "react-icons/tb";
import { tv } from "tailwind-variants";

interface Props {
  toggleButton: React.ReactNode;
  title?: string;
  children: React.ReactNode;
}

const modalStyle = tv({
  base: "flex flex-col transition-all duration-300 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 border-2 border-gray-600 rounded-lg outline-none focus:outline-none w-full sm:w-96 bg-gray-900",
  variants: {
    isOpen: {
      true: "top-1/2 opacity-100",
      false: "-top-full opacity-0",
    },
  },
});

export interface RefModal {
  close: () => void;
}

const Modal = React.forwardRef(
  ({ toggleButton, title, children }: Props, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    function handleClose() {
      setIsOpen(false);
    }

    function handleOpen() {
      setIsOpen(true);
    }

    React.useImperativeHandle(ref, () => ({
      close: handleClose,
    }));

    return (
      <>
        {React.Children.map(toggleButton, (child) => {
          if (child && React.isValidElement(child)) {
            return React.cloneElement<
              React.ButtonHTMLAttributes<HTMLButtonElement>
            >(child as any, { onClick: handleOpen });
          }
          return child;
        })}
        <div className={modalStyle({ isOpen })}>
          <header className="flex items-start justify-between p-5 border-b border-solid border-gray-600 rounded-t">
            <h3 className="text-xl font-semibold text-gray-300">{title}</h3>
            <button
              className="p-1 ml-auto text-gray-300 text-2xl hover:text-gray-700"
              onClick={handleClose}
            >
              <TbX className="ms-4" />
            </button>
          </header>
          <div className="px-4 py-2">{children}</div>
        </div>
        {isOpen && (
          <div
            onClick={handleClose}
            className="opacity-25 fixed inset-0 z-30 bg-black"
          />
        )}
      </>
    );
  }
);

export default Modal;
