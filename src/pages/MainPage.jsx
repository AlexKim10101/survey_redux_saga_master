import React from 'react'
import ProgressLinear from "../components/progressLinear/ProgressLinear";
import AccordionList from "../components/accordionList/AccordionList";

function MainPage({ progress, pages, onClickAccordionItemButton }) {
  return (
    <div>
      <ProgressLinear progress={progress} />
      <AccordionList
              pages={pages}
              onClickAccordionItemButton={onClickAccordionItemButton}
            />
    </div>
  )
}

export default MainPage
