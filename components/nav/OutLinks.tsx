import Patreon from "../icons/Patreon";
import Github from "../icons/Github";
import Discord from "../icons/Discord";

export default function OutLinks() {
  return <div className = {`flex-none pb-1 border-b dark:border-dark-700`}>
    <a rel = "noreferrer" className = "px-3 py-1 hover:bg-gray-400 dark-hover:bg-dark-600 block w-full" href = "https://github.com/CraftTweaker/CraftTweaker-Documentation/" target = "_blank">
      <Github/>

      <span className = {`pl-1`}>Visit this wiki on Github</span> </a>
    <a rel = "noreferrer" className = "px-3 py-1 hover:bg-gray-400 dark-hover:bg-dark-600 block w-full" href = "https://www.patreon.com/bePatron?u=104953&s=docs" target = "_blank">
      <Patreon/>

      <span className = {`pl-1`}>Support this wiki on Patreon</span> </a>
    <a rel = "noreferrer" className = "px-3 py-1 hover:bg-gray-400 dark-hover:bg-dark-600 block w-full" href = "https://discord.blamejared.com" target = "_blank">
      <Discord/>

      <span className = {`pl-1`}>Join the Discord</span> </a>
  </div>;
}
