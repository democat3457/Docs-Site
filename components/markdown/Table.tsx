import SimpleBar from "simplebar-react";
import { HasChildren } from "../../utils/Interfaces";

export default function Table({ children }: HasChildren) {
  return <>
    <SimpleBar forceVisible = {"x"} autoHide = {false} direction = {'x'}>
      <table className = {`w-full table-auto mb-6 bg-white dark:bg-dark-800`}>
        {children}
      </table>
    </SimpleBar>
  </>
}