"use client";
import { Card } from "@/components/ui/card";
import { Breadcrumb } from "@/components/ui/bread-crumb";
import { Dropdown } from "@/components/ui/dropdown";
import { DataTable } from "@/components/table/data-table";

export default function Page() {
  return (
    <main className='min-h-screen bg-neutral-50 font-sans p-4 md:p-8 space-y-10'>
      <div className='mx-auto space-y-10'>
        <section className='space-y-4'>
          <h1 className='text-2xl font-semibold tracking-tight text-neutral-900'>
            Billing Dashboard
          </h1>
        </section>

        <section className='space-y-2'>
          <Card>
            <section className='flex items-center justify-between'>
              <Breadcrumb
                crumbs={[
                  { label: "Cluster A", value: "ClusterA" },
                  { label: "NameSpace A", value: "NamespaceA" },
                ]}
                activeCrumb='NamespaceA'
              />
              <Dropdown
                options={[
                  { label: "Last 7 Days", value: "7d" },
                  { label: "Last 30 Days", value: "30d" },
                  { label: "Last 90 Days", value: "90d" },
                  { label: "Last Year", value: "1y" },
                ]}
                defaultValue={"30d"}
              />
            </section>
            <DataTable
              data={[
                {
                  name: "Namespace A",
                  cpu: "$1,231",
                  ram: "$684",
                  storage: "$123",
                  network: "$153",
                  gpu: "$410",
                  efficiency: "5%",
                  total: "$3,433",
                },
                {
                  name: "Namespace B",
                  cpu: "$739",
                  ram: "$410",
                  storage: "$73",
                  network: "$92",
                  gpu: "$246",
                  efficiency: "20%",
                  total: "$2,060",
                },
                {
                  name: "Namespace C",
                  cpu: "$369",
                  ram: "$205",
                  storage: "$36",
                  network: "$46",
                  gpu: "$123",
                  efficiency: "50%",
                  total: "$1,030",
                },
                {
                  name: "Namespace D",
                  cpu: "$123",
                  ram: "$68",
                  storage: "$12",
                  network: "$15",
                  gpu: "$41",
                  efficiency: "40%",
                  total: "$343",
                },
              ]}
            />
          </Card>
        </section>
      </div>
    </main>
  );
}
