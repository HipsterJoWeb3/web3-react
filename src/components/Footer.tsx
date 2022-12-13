
import {generalData} from "../redux/general/slice";
import React, {useEffect, useMemo} from "react";
import {useSelector} from "react-redux";

export interface FooterProps {
    data?: any;
}

const Footer: React.FC<FooterProps> = () => {

  const {general} = useSelector(generalData)


  const links = useMemo(() => general?.links, [general])

  return (
    <footer>
      <ul>
        {
          links && links.map((link: any) =>
            <li key={link.value}>
              <a href={link.url} target="_blank">{link.value}</a>
            </li>
          )
        }
      </ul>
    </footer>
  )
}




export default Footer
