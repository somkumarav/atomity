import { Card } from "@/components/ui/card";
import { Breadcrumb } from "@/components/ui/bread-crumb";

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
            </section>
          </Card>
        </section>
      </div>
    </main>
  );
}
