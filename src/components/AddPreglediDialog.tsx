import { PacijentContext } from "@/pages/pacijent/[id]";
import { RouterOutputs, api } from "@/utils/api";
import { Combobox, Dialog, Transition } from "@headlessui/react";

import {
  Dispatch,
  Fragment,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type Ordinacija = RouterOutputs["ordinacije"]["getMultipleWIthID"];

export default function AddPregledi({ close }: { close: () => void }) {
  const { idPosete } = useContext(PacijentContext);

  const { mutateAsync } = api.pregled.create.useMutation();
  const [id, setId] = useState<string>("");

  const getMultipleWIthIDs = api.ordinacije.getMultipleWIthID.useQuery(id, {
    placeholderData: [
      {
        id: "",
        imeOrdinacija: "Kardiologija",
        kapacitet: 8,
        telefon: "021/123-456",
        brojSobe: "1",
      },
    ],
  });
  const posete = getMultipleWIthIDs.data;

  const selected = posete?.findLast((x) => x.id === id);

  const onSubmit = () => {
    if (!selected) return;
    void mutateAsync({
      ordinacijaId: selected?.id,
      posetaId: idPosete,
    }).then(() => {
      closeModal();
    });
  };
  function closeModal() {
    close();
  }

  return (
    <ProstaOdjava
      closeModal={closeModal}
      onSubmit={onSubmit}
      selected={selected}
    >
      <div>
        <label className="text-gray-700 " htmlFor="JMBG">
          Poseta ID
        </label>
        <Combo posete={posete} id={id} setId={setId} />
      </div>
    </ProstaOdjava>
  );
}

export function ProstaOdjava({
  closeModal,
  selected,
  onSubmit,
  children,
}: {
  closeModal: () => void;
  selected?: Ordinacija[0];
  onSubmit: () => void;
  children: React.ReactNode;
}) {
  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Ordinacija: {selected && selected.imeOrdinacija}
                </Dialog.Title>
                <div className="mt-2">
                  <div className="flex flex-col gap-2">{children}</div>

                  <div className="mt-4 flex justify-end gap-4">
                    <button
                      className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                      onClick={(e) => {
                        e.preventDefault();
                        closeModal();
                      }}
                    >
                      Otkaži
                    </button>
                    <button
                      onClick={onSubmit}
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-600  px-4 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                    >
                      Dodaj
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

function Combo({
  posete,
  id,
  setId,
}: {
  posete: Ordinacija | undefined;
  id: string;
  setId: (x: string) => void;
}) {
  const [selected, setSelected] = useState(
    posete?.findLast((val) => val.id === id) ?? null
  );

  useEffect(() => {
    if (selected) {
      setId(selected.id);
    }
  }, [selected]);

  return (
    <Combobox value={selected} onChange={setSelected}>
      <div className="relative mt-1">
        <div className="relative mt-2 block w-full  ">
          <Combobox.Input
            className="w-full   rounded-md border border-gray-200 bg-white px-4 py-2 text-sm leading-5 text-gray-700  focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            displayValue={(poseta: { id: string }) => poseta?.id}
            onChange={(event) => {
              setId(event.target.value);
            }}
          />
          {/* <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
                                  className="h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                /> 
          </Combobox.Button> */}
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {posete && posete.length === 0 ? (
              <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                Nothing found.
              </div>
            ) : (
              posete?.map((oedinacija) => (
                <Combobox.Option
                  key={oedinacija.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-teal-600 text-white" : "text-gray-900"
                    }`
                  }
                  value={oedinacija}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {oedinacija.brojSobe} - {oedinacija.imeOrdinacija}
                      </span>
                      <span> {oedinacija.id}</span>
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
}
