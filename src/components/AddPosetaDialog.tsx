import { JMBGContext, makelen13 } from "@/pages/pacijent";
import { api } from "@/utils/api";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import { Prisma } from "@prisma/client";
import { useRouter } from "next/router";
import {
  Dispatch,
  Fragment,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { set, useForm } from "react-hook-form";

interface Pacijent {
  jmbg: bigint;
  ime: string;
  prezime: string;
  datumRodj: Date;
  lbo: string;
  danKreacije: Date;
}

export default function AddPoseta() {
  const { jmbg, resetPosetaModel } = useContext(JMBGContext);
  const { mutateAsync } = api.poseta.add.useMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Prisma.PosetaCreateManyInput>();

  const getMultipleWIthIDs = api.pacijent.getMultipleWIthID.useQuery(jmbg, {
    placeholderData: [
      {
        jmbg: jmbg,
        ime: "",
        prezime: "",
        datumRodj: new Date(),
        lbo: "",
        danKreacije: new Date(),
      },
    ],
  });
  const people = getMultipleWIthIDs.data;
  const router = useRouter();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    mutateAsync({
      pacijentJMBG: jmbg,
      simptomi: data.simptomi,
      prioritet: data.prioritet,
      uput: data.uput ? data.uput : "",
    })
      .then(() => {
        void router.push("/pacijent/" + jmbg);
      })
      .catch(console.error);

    closeModal();
  });

  function closeModal() {
    reset();
    resetPosetaModel();
  }

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
                  Dodaj pacijenta
                </Dialog.Title>
                <div className="mt-2">
                  <form
                    onSubmit={() => {
                      void onSubmit();
                    }}
                  >
                    <div className="flex flex-col gap-2">
                      <div>
                        <label className="text-gray-700 " htmlFor="JMBG">
                          Pacijent JMBG
                        </label>
                        {people && <Combo people={people} />}
                      </div>
                      <div>
                        <label className="text-gray-700 " htmlFor="simptomi">
                          Simptomi
                        </label>
                        <input
                          {...register("simptomi", { required: true })}
                          id="simptomi"
                          type="text"
                          className="mt-2 block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 "
                        />
                      </div>

                      <div>
                        <label className="text-gray-700 " htmlFor="uput">
                          Uput
                        </label>
                        <input
                          {...register("uput", { required: true, value: "" })}
                          id="uput"
                          type="text"
                          className="mt-2 block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 "
                        />
                      </div>

                      <div>
                        <label className="text-gray-700 " htmlFor="prioritet">
                          Prioritet
                        </label>
                        <input
                          {...register("prioritet", {
                            required: true,
                            value: 0,
                            valueAsNumber: true,
                          })}
                          id="prioritet"
                          type="number"
                          className="mt-2 block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 "
                        />
                      </div>
                    </div>

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
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-600  px-4 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                      >
                        Napravi
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

function Combo({ people }: { people: Pacijent[] }) {
  const { jmbg, setJmbg } = useContext(JMBGContext);
  const [selectedPerson, setSelectedPerson] = useState(
    people?.findLast((val) => val.jmbg === jmbg) ?? null
  );

  useEffect(() => {
    setJmbg(selectedPerson?.jmbg ?? BigInt(0));
  }, [selectedPerson]);

  return (
    <Combobox value={selectedPerson} onChange={setSelectedPerson}>
      <div className="relative mt-1">
        <div className="relative mt-2 block w-full  ">
          <Combobox.Input
            className="w-full   rounded-md border border-gray-200 bg-white px-4 py-2 text-sm leading-5 text-gray-700  focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
            displayValue={(person: { jmbg: bigint }) => person?.jmbg.toString()}
            onChange={(event) => {
              setJmbg(BigInt(event.target.value));
            }}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            {/* <ChevronUpDownIcon
                                  className="h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                /> */}
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {people && people.length === 0 ? (
              <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                Nothing found.
              </div>
            ) : (
              people?.map((person) => (
                <Combobox.Option
                  key={person.jmbg.toString()}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-teal-600 text-white" : "text-gray-900"
                    }`
                  }
                  value={person}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {person.ime} - {person.jmbg.toString()}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-teal-600"
                          }`}
                        >
                          {/* <CheckIcon
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                              /> */}
                        </span>
                      ) : null}
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
