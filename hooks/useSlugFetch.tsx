import { useQuery } from "@tanstack/react-query";
import {
  getClusterInfo,
  getNameSpaceInfo,
  getPodInfo,
} from "@/actions/cluster.action";
import { formatCurrency } from "@/lib/format-currency";

export const slugConfig = {
  cluster: {
    queryKey: ["fetch-cluster"],
    queryFn: getClusterInfo,
  },
  namespace: {
    queryKey: ["fetch-namespace"],
    queryFn: getNameSpaceInfo,
  },
  pod: {
    queryKey: ["fetch-pod"],
    queryFn: getPodInfo,
  },
} as const;

const selectData = (res: Awaited<ReturnType<typeof getClusterInfo>>) => {
  if (!res?.length) throw new Error("No data");

  return {
    tableData: res.map((item) => ({
      name: item.name,
      cpu: formatCurrency(item.cpu),
      ram: formatCurrency(item.ram),
      storage: formatCurrency(item.storage),
      network: formatCurrency(item.network),
      gpu: formatCurrency(item.gpu),
      efficiency: item.efficiency,
      total: formatCurrency(item.total),
    })),
    graphData: res.map((item) => ({
      id: item.id,
      label: item.name,
      height: item.total,
    })),
  };
};

export const useSlugFetch = (
  slug: keyof typeof slugConfig | null,
  id: number,
) => {
  const config = slug ? slugConfig[slug] : null;

  return useQuery({
    queryKey: config?.queryKey ?? ["idle"],
    queryFn: () => config!.queryFn(id),
    enabled: !!config && !!id,
    select: selectData,
  });
};
