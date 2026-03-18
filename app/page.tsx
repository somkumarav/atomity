"use client";
import { Card } from "@/components/ui/card";
import { Breadcrumb } from "@/components/ui/bread-crumb";
import { Dropdown } from "@/components/ui/dropdown";
import { DataTable } from "@/components/table/data-table";
import { Graph } from "../components/bar-graph/graph";
import { useTheme } from "next-themes";
import { useClusters } from "../hooks/useCluster";

export default function Page() {
  const { theme, setTheme } = useTheme();
  const { data: clusterData, isLoading, isError } = useClusters();

  if (isLoading) return <>loading</>;
  if (isError) return <div>error</div>;
  if (!clusterData) return <div>Cluster data is empty</div>;

  return (
    <main className='min-h-screen font-sans p-4 md:p-8 space-y-10'>
      <button
        className='cursor-pointer'
        onClick={() => {
          setTheme(theme === "dark" ? "light" : "dark");
        }}
      >
        {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
      </button>

      <div className='mx-auto space-y-10'>
        <section className='space-y-4'>
          <h1 className='text-2xl font-semibold tracking-tight'>
            Billing Dashboard
          </h1>
        </section>

        <section className='flex items-center justify-center'>
          <Card className='w-4xl space-y-4'>
            <div className='flex items-center justify-between'>
              <Breadcrumb
                crumbs={[{ label: "Cluster A", value: "ClusterA" }]}
                activeCrumb='Cluster A'
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
            </div>
            <div className='h-50'>
              <Graph bars={clusterData.graphData} />
            </div>

            <DataTable data={clusterData.tableData} />
          </Card>
        </section>
      </div>
    </main>
  );
}
