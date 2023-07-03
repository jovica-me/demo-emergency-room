import AddPregledi from "@/components/AddPreglediDialog";
import { ProstaOdjava } from "@/components/OdjavaPoseteDialog";
import Table from "@/components/Table";
import MainLayout from "@/layouts/MainLayout";
import { RouterInputs, RouterOutputs, api } from "@/utils/api";
import { createColumnHelper, getCoreRowModel } from "@tanstack/react-table";
import Head from "next/head";
import { useRouter } from "next/router";
import { createContext, use, useContext, useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { useForm } from "react-hook-form";

type PacijentIPosete = RouterOutputs["pacijent"]["getOneWithIdAndPosete"];

interface PacijentIPoseteValue {
  idPosete: string | null;
  idPregleda: string;
  setIdPosete: (x: string) => void;
  setIdPregleda: (x: string) => void;
}

export const PacijentContext = createContext<PacijentIPoseteValue>({
  idPosete: "",
  idPregleda: "",
  setIdPosete: () => {},
  setIdPregleda: () => {},
});
export default function Page({}) {
  const router = useRouter();
  const id = router.query.id as string;
  return (
    <MainLayout>
      <Head>
        <title>Poseta - </title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container flex flex-col  p-4">
        {id && <Layout id={id}></Layout>}
      </main>
    </MainLayout>
  );
}

type Izvestaj = RouterInputs["izvestaj"]["create"];

function Layout({ id }: { id: string }) {
  const { mutateAsync } = api.izvestaj.create.useMutation();

  const { register, handleSubmit } = useForm<Izvestaj>();

  const onSubmit = handleSubmit((data) => {
    void mutateAsync({
      datum: new Date(),
      kontrola: data.kontrola,
      misljenjeDoktora: data.misljenjeDoktora,
      pregledId: id,
      terapija: data.terapija,
      datoteke: [],
    });
  });

  return (
    <div className="grid  gap-4">
      <Head>
        <title>Izvestaj</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form
        onSubmit={() => {
          void onSubmit();
        }}
      >
        <div className="flex flex-col gap-4 rounded-xl bg-white p-4">
          <h2 className="text-lg font-medium text-gray-800  ">Izvestaj</h2>
          <div>
            <label className="text-gray-700 " htmlFor="misljenjeDoktora">
              Misljenje doktora
            </label>
            <textarea
              {...register("misljenjeDoktora", { required: true })}
              id="misljenjeDoktora"
              className="mt-2 block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 "
            />
          </div>
          <div>
            <label className="text-gray-700 " htmlFor="kontrola">
              Kontorla
            </label>
            <textarea
              {...register("kontrola", { required: true })}
              id="kontrola"
              className="mt-2 block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 "
            />
          </div>
          <div>
            <label className="text-gray-700 " htmlFor="terapija">
              Terapija
            </label>
            <textarea
              {...register("terapija", { required: true })}
              id="terapija"
              className="mt-2 block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 "
            />
          </div>
          <div>
            <label className="text-gray-700 " htmlFor="datoteke">
              Datoteke
            </label>
            <input
              {...register("datoteke", { required: true })}
              id="datoteke"
              type="file"
              multiple
              className="mt-2 block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 "
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
              Sacuvaj
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
