"use client";
import { useParams } from "next/navigation";
import { useSlugFetch } from "@/hooks/useSlugFetch";
import { Card } from "@/components/ui/card";
import { Breadcrumb } from "@/components/ui/bread-crumb";
import { Dropdown } from "@/components/ui/dropdown";
import { Graph } from "@/components/bar-graph/graph";
import { DataTable } from "@/components/table/data-table";
import { useTheme } from "next-themes";

export default function BarPage() {
  const { theme, setTheme } = useTheme();
  const { slug } = useParams<{ slug: string[] }>();
  const id = Number(slug.at(-1));
  const depth = slug.length;

  const key = depth === 1 ? "namespace" : depth === 2 ? "pod" : null;

  const { data, isLoading, isError } = useSlugFetch(key, id);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  if (!data) return null;

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
            </div>
            <div className='h-50'>
              <Graph bars={data.graphData} />
            </div>

            <DataTable data={data.tableData} />
          </Card>
        </section>
      </div>
    </main>
  );
}
