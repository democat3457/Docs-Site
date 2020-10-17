import { TableCellProps } from "../../utils/Interfaces";

export default function TableCell({ isHeader, children }: TableCellProps) {

  let className = `px-2 py-1 border border-gray-400 dark:border-dark-600`;
  if (isHeader) {
    return <>
      <th className = {`${className} bg-gray-200 dark:bg-dark-700`}>
        {children}
      </th>
    </>
  }
  return <>
    <td className = {className}>
      {children}
    </td>
  </>
}