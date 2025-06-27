import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import "./Accordion.css";

import { useState, useEffect } from "react";


export default function Accordion({ items }) {

    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <>
            <p>Accordions</p>

            {

                (items.length > 0) ?
                    <>
                        <div>Items:</div>
                        {
                            items.map((item, idx) => {

                                return (
                                    <div key={idx}>
                                        <div
                                            className="acc-header"
                                            onClick={(e) => {
                                                // if clicked on same acc then close
                                                // else set to new idx
                                                if (activeIndex === idx) {
                                                    setActiveIndex(null);
                                                } else {
                                                    setActiveIndex(idx)
                                                }
                                            }}
                                        >
                                            {
                                                (activeIndex === idx) ?
                                                    <>
                                                        <ArrowDropDownIcon />
                                                        <p>{item.title}</p>
                                                        <p className="acc-content">{item.content}</p>
                                                    </> :
                                                    <>
                                                        <ArrowRightIcon />
                                                        <p>{item.title}</p>
                                                    </>

                                            }

                                        </div>
                                    </div>
                                )
                            })
                        }
                    </>
                    :
                    <h3>No Items Available</h3>
            }
        </>
    )
}