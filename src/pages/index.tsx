import Table from "@/components/Table";
import MainLayout, { InnerNav } from "@/layouts/MainLayout";
import { RouterOutputs, api } from "@/utils/api";
import { createColumnHelper, getCoreRowModel } from "@tanstack/react-table";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  return (
    <MainLayout>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-auto flex max-w-3xl flex-col  p-4">
        <InnerNav />
      </main>
    </MainLayout>
  );
}
