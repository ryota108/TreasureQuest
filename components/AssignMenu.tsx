import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { UserGroupIcon,UserIcon } from "@heroicons/react/24/solid";
import { useBoardStore } from "@/store/BoardStore";

interface Props {
  assignList: string[];
}

const AssignMenu: React.FC<Props> = ({ assignList }) => {
  const setAssignQuery = useBoardStore((state) => state.setAssignQuery);

  return (
    <div>
      <Menu as="div" className="relative inline-block text-left z-100">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-2 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <UserIcon className="mr-2 h-5 w-5" aria-hidden="true" /> Sort
            <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              {assignList.map((assign) => (
                <Menu.Item key={assign}>
                  {({ active }) => (
                    <button
                      onClick={setAssignQuery.bind(null, assign)}
                      className={`${
                        active ? "bg-blue-800" : ""
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm text-white`}
                    >
                      {active ? (
                        <UserIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                      ) : (
                        <UserIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                      )}
                      {assign}
                    </button>
                  )}
                </Menu.Item>
              ))}
              <Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={setAssignQuery.bind(null, "")}
                      className={`${
                        active ? "bg-blue-800" : ""
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm text-white`}
                    >
                      {active ? (
                        <UserGroupIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                      ) : (
                        <UserGroupIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                      )}
                      全員を表示
                    </button>
                  )}
                </Menu.Item>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default AssignMenu;
