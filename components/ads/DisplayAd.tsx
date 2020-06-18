import React, { useEffect } from "react";
import { AdProps } from "../../utils/Interfaces";
import { matchesMedia } from "../../utils/Utils";

function DisplayAd({ client = "ca-pub-7211841189345460", format = "auto", responsive = true, slot, className = "", mediaQuery = "", current }: AdProps) {
  let matches = matchesMedia(mediaQuery);
  useEffect(() => {
    if (!matches) {
      return;
    }
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
    }
  }, [matches, current]);

  if (!matches) {
    return <> </>;
  }

  return <div key = {`${current.key}-${current.value}-${slot}`}>
    <script async src = {"https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"}/>
    <ins className = {`adsbygoogle block ${className}`}
         data-ad-client = {client}
         data-ad-slot = {slot}
         data-ad-format = {format}
         data-full-width-responsive = {responsive}/>
  </div>;
}


export default DisplayAd;
