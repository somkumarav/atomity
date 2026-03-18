import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTheme } from "next-themes";

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
    efficiency: number;
    total: string;
  }[];
}) => {
  const { theme } = useTheme();

  return (
    <Table>
      <TableHeader>
        <TableRow className='border-b border-border'>
          <TableHead></TableHead>
          <TableHead className='text-accent-foreground text-right text-xs'>
            CPU
          </TableHead>
          <TableHead className='text-accent-foreground text-right text-xs'>
            RAM
          </TableHead>
          <TableHead className='text-accent-foreground text-right text-xs'>
            STORAGE
          </TableHead>
          <TableHead className='text-accent-foreground text-right text-xs'>
            NETWORK
          </TableHead>
          <TableHead className='text-accent-foreground text-right text-xs'>
            GPU
          </TableHead>
          <TableHead className='text-accent-foreground text-right text-xs'>
            EFFICIENCY
          </TableHead>
          <TableHead className='text-accent-foreground text-right text-xs'>
            TOTAL
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, i) => (
          <TableRow
            key={row.name}
            initial={{
              opacity: 0,
              borderBottomColor: "rgba(0,0,0,0)",
            }}
            animate={{
              opacity: 1,
              borderBottomColor:
                theme === "dark"
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.1)",
            }}
            transition={{
              duration: 0.8,
              delay: i * 0.05,
              ease: "easeInOut",
            }}
            className='border-b'
          >
            <TableCell className='py-3 font-semibold'>{row.name}</TableCell>

            <TableCell className='py-3 font-medium text-right text-muted-foreground dark:text-muted-foreground/50'>
              {row.cpu}
            </TableCell>
            <TableCell className='py-3 font-medium text-right text-muted-foreground dark:text-muted-foreground/50'>
              {row.ram}
            </TableCell>
            <TableCell className='py-3 font-medium text-right text-muted-foreground dark:text-muted-foreground/50'>
              {row.storage}
            </TableCell>
            <TableCell className='py-3 font-medium text-right text-muted-foreground dark:text-muted-foreground/50'>
              {row.network}
            </TableCell>
            <TableCell className='py-3 font-medium text-right text-muted-foreground dark:text-muted-foreground/50'>
              {row.gpu}
            </TableCell>
            <TableCell className='py-3 text-right'>
              <span className='text-accent-foreground font-medium bg-accent-foreground/10 px-2 py-0.5 rounded-full text-xs'>
                {row.efficiency}
              </span>
            </TableCell>
            <TableCell className='py-3 text-right font-semibold'>
              {row.total}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
