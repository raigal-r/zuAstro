import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment } from "react";

export interface ModalProps
  extends Pick<React.HTMLAttributes<HTMLDivElement>, "children"> {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children?: React.ReactNode;
  closable?: boolean;
  onClose?: () => void;
}

export const Icons: Record<string, any> = {
    close: (props: any) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M15 9L9 15M9 9L15 15M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
          stroke="#F5F5F6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
}

const Modal = ({
    isOpen,
  setIsOpen,
  children,
  closable = true, // show close button when active
  onClose, // run when modal close
}: ModalProps) => {
  const onCloseModal = () => {
    onClose?.();
    setIsOpen(false);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-100" onClose={onCloseModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full w-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="fixed top-0 bottom-0 left-0 right-0 bg-shark-970 w-full transform overflow-hidden p-6 text-left align-middle shadow-xl transition-all">
                {closable && (
                  <div className="fixed z-100 right-[24px] top-[6px] flex items-center h-12 py-8">
                    <button
                      type="button"
                      className="ml-auto ring-0 focus:right-0 focus:outline-none outline-none cursor-pointer"
                      onClick={onCloseModal}
                    >
                      <Icons.close />
                    </button>
                  </div>
                )}
                <div className="flex flex-col grow h-full overflow-scroll pb-6">
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

Modal.displayName = "Modal";

export default Modal;