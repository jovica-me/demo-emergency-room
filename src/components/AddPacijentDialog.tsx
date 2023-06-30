import { api } from "@/utils/api";
import { Dialog, Transition } from "@headlessui/react";
import { Prisma } from "@prisma/client";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";

export default function AddPacijent({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) {
  const { mutateAsync } = api.pacijent.add.useMutation();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },

    reset,
  } = useForm<Prisma.PacijentCreateWithoutPoseteInput>();
  const onSubmit = handleSubmit((data) => {
    mutateAsync({
      datumRodj: new Date(data.datumRodj),
      ime: data.ime,
      jmbg: BigInt(data.jmbg),
      prezime: data.prezime,
      lbo: data.lbo,
    });
    closeModal();
  });
  function closeModal() {
    setIsOpen(false);
    reset();
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
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
                  <form onSubmit={onSubmit}>
                    <div className="flex flex-col gap-2">
                      <div>
                        <label className="text-gray-700 " htmlFor="ime">
                          Ime
                        </label>
                        <input
                          {...register("ime", { required: true })}
                          id="ime"
                          type="text"
                          className="mt-2 block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 "
                        />
                      </div>

                      <div>
                        <label className="text-gray-700 " htmlFor="prezime">
                          Prezime
                        </label>
                        <input
                          {...register("prezime", { required: true })}
                          id="prezime"
                          type="text"
                          className="mt-2 block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 "
                        />
                      </div>

                      <div>
                        <label className="text-gray-700 " htmlFor="JMBG">
                          JMBG
                        </label>
                        <input
                          {...register("jmbg", { required: true })}
                          id="JMBG"
                          type="number"
                          className="mt-2 block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 "
                        />
                      </div>
                      <div>
                        <label className="text-gray-700 " htmlFor="lbo">
                          LBO
                        </label>
                        <input
                          {...register("lbo", { required: true })}
                          id="lbo"
                          type="number"
                          className="mt-2 block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 "
                        />
                      </div>
                      <div>
                        <label className="text-gray-700 " htmlFor="datRod">
                          DatimRodjenja
                        </label>
                        <input
                          {...register("datumRodj", { required: true })}
                          id="datRod"
                          type="datetime-local"
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
