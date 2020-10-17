import { HasChildren } from "../../utils/Interfaces";

export default function InlineCode({ children }: HasChildren) {
  return <>
    <code className = {`inline bg-gray-200 dark:bg-dark-800 rounded p-1`}>
      {children}
    </code>
  </>
}