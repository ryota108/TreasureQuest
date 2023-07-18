"use client";
import { FormEvent, Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useModalStore } from "@/store/ModalStore";
import { useBoardStore } from "@/store/BoardStore";
import TaskTypeRadioGroup from "./TaskTypeRadioGroup";
import { UserCircleIcon } from "@heroicons/react/24/solid";

// import { useUserStore } from "@/store/UserStore";

function Modal() {
  const imagePickerRef = useRef<HTMLInputElement>(null);
  // const userData = useUserStore(state =>state.user);
  const [
    addTask,
    image,
    setImage,
    newTaskInput,
    setNewTaskInput,
    newTaskType,
    newAssign,
    setNewAssign,
  ] = useBoardStore((state) => [
    state.addTask,
    state.image,
    state.setImage,
    state.newTaskInput,
    state.setNewTaskInput,
    state.newTaskType,
    state.newAssign,
    state.setNewAssign,
  ]);
  const [isOpen, closeModal] = useModalStore((state) => [
    state.isOpen,
    state.closeModal,
  ]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTaskInput) return;
    addTask(newTaskInput, newTaskType, newAssign);
    setImage(null);
    closeModal();
  };

  return (
    // Use the `Transition` component at the root level
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        onSubmit={handleSubmit}
        as="form"
        className="relative z-10"
        onClose={closeModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-60" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-900 border  border-gray-600 p-6 text-left align-middle shadow-2xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-white pb-2"
                >
                  Add a Task
                </Dialog.Title>
                <div className="mt-2">
                  <input
                    type="text"
                    value={newTaskInput}
                    onChange={(e) => setNewTaskInput(e.target.value)}
                    placeholder="Enter a task here..."
                    className="w-full border border-gray-300 bg-transparent rounded-md outline-none p-5 text-white"
                  />
                  <div className="flex">
                    <UserCircleIcon className="w-8 h-8 text-white relative top-2 left-1" />
                    <p className="text-white mt-3 ml-2">
                      assignee
                      <span className="opacity-50 ml-2">(optional)</span>
                    </p>
                  </div>
                  <input
                    type="text"
                    value={newAssign}
                    onChange={(e) => setNewAssign(e.target.value)}
                    placeholder="Who will be in charge of this task? (e.g. ME)"
                    className="w-full border mt-4 -mb-2 border-gray-300 bg-transparent rounded-md outline-none p-5 text-white"
                  />
                </div>
                <TaskTypeRadioGroup />
                <div className="mt-4n">
                  <button
                    type="submit"
                    disabled={!newTaskInput}
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-500 disabled:text-gray-300 disabled:cursor-not-allowed"
                  >
                    Add Task
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Modal;
