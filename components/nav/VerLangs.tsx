import { useRouter } from "next/router";
import { VerLangsProps } from "../../utils/Interfaces";

export default function VerLangs({ verlang, version, lang, stub, current }: VerLangsProps) {
  let router = useRouter();
  return <div className = {`flex-none flex flex-row justify-between border-b dark:border-dark-700`}>
    <div className = "flex-none relative my-auto inline-block py-2 flex flex-row pl-2">
      <label htmlFor = "version-select" className = "text-sm">Version:</label>
      <select id = "version-select" className = {`bg-transparent px-1`} disabled = {stub} onChange = {event => {
        router.push(`/[version]/[lang]`, `/${event.target.value}/${lang}`)
      }} value = {version}>
        {!stub && Object.keys(verlang).map(value =>
          <option key = {value} value = {value} className = {`text-black`}>{value}</option>)}
      </select>
    </div>
    <div className = "flex-shrink relative my-auto inline-block py-2 flex flex-row pr-2">
      <label htmlFor = "language-select" className = "text-sm">Language:</label>
      <select id = "language-select" className = {`bg-transparent px-1`} disabled = {stub} onChange = {event => {
        router.push(`/[version]/[lang]/[...slug]`, `/${version}/${event.target.value}/${current.value}`)
      }} value = {lang}>
        {!stub && Object.values(verlang[version]).map((value: any) =>
          <option key = {value} value = {value} className = {`text-black`}>{value}</option>)}
      </select>
    </div>
  </div>;
}
