import React, {useState} from 'react';
import "./PaginationDisplay.css"
import Button from "react-bootstrap/Button";

const PaginationDisplay = (props: {itemsToDisplay: any[], cols: number, rows:number}) => {
    const [currPage, setCurrPage] = useState(0);
    const {itemsToDisplay, cols, rows} = props;
    const gtc = "1fr ".repeat(cols);
    const numbPerPage = cols*rows;
    const totalPages = Math.ceil(itemsToDisplay.length/numbPerPage);
    const itemsForThisPage=itemsToDisplay.slice((currPage)*numbPerPage, (currPage+1)*numbPerPage);

    const changePageWithinLimits = (incr: number) => {
        if (incr > 0) {
            setCurrPage((currPage+1)%totalPages);
        } else {
            let nextPage = (currPage-1);
            if (nextPage < 0) nextPage = totalPages-1;
            setCurrPage(nextPage);
        }
    }

    return (
        <div className={"pagination-container"}>
            <div className={"pagination-display"} style={{gridTemplateColumns: gtc}}>
                {itemsForThisPage}
            </div>
            {totalPages > 1 && (<div className={"pagination-controls"}>
                <Button onClick={() => changePageWithinLimits(-1)} variant={"dark"}>Back</Button>
                <h5>Page {currPage+1}/{totalPages}</h5>
                <Button onClick={() => changePageWithinLimits(1)} variant={"dark"}>Next</Button>
            </div>)}
        </div>
    )
};

export default PaginationDisplay;