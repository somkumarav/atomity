import { useQuery } from "@tanstack/react-query";
import { getClusterInfo } from "../actions/cluster.action";
import { formatCurrency } from "../lib/format-currency";

export const useClusters = () => {
  return useQuery({
    queryKey: ["fetch-cluster"],
    queryFn: async () => {
      const res = await getClusterInfo();
      return res;
    },
    select: (res) => {
      if (!res) {
        throw new Error("No cluster data");
      }

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
          label: item.name,
          height: item.total,
        })),
      };
    },
  });
};
