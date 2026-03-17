import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const DataTable = ({
  data,
}: {
  data: {
    name: string;
    cpu: string;
    ram: string;
    storage: string;
    network: string;
    gpu: string;
    efficiency: string;
    total: string;
  }[];
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead className='text-right text-xs'>CPU</TableHead>
          <TableHead className='text-right text-xs'>RAM</TableHead>
          <TableHead className='text-right text-xs'>STORAGE</TableHead>
          <TableHead className='text-right text-xs'>NETWORK</TableHead>
          <TableHead className='text-right text-xs'>GPU</TableHead>
          <TableHead className='text-right text-xs'>EFFICIENCY</TableHead>
          <TableHead className='text-right text-xs'>TOTAL</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, i) => (
          <TableRow
            key={row.name}
            initial={{
              opacity: 0,
              borderBottomColor: "rgba(250, 250, 250, 0)",
            }}
            animate={{
              opacity: 1,
              borderBottomColor: "rgba(245, 245, 245, 1)",
            }}
            transition={{
              duration: 0.8,
              delay: i * 0.08,
              ease: "easeOut",
            }}
            className='border-b'
          >
            <TableCell className='font-semibold'>{row.name}</TableCell>
            <TableCell className='text-right'>{row.cpu}</TableCell>
            <TableCell className='text-right'>{row.ram}</TableCell>
            <TableCell className='text-right'>{row.storage}</TableCell>
            <TableCell className='text-right'>{row.network}</TableCell>
            <TableCell className='text-right'>{row.gpu}</TableCell>
            <TableCell className='text-right'>
              <span className='text-[#00994D] font-medium bg-[#00D97E]/10 px-2 py-0.5 rounded-full text-xs'>
                {String(row.efficiency)}
              </span>
            </TableCell>
            <TableCell className='text-right font-semibold'>
              {row.total}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
