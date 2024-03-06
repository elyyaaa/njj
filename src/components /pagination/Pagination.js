import React from 'react';


const Pagination = ( {handleNext, page, handlePrev}) => {
    return (
        <div style={{
            cursor:"pointer",
            display:"flex",
            justifyContent:"space-between",
            padding:"10px",
        }}>
            <p style={{
                border:"1px solid #deb8b8",
                padding:"10px",
                borderRadius:"50%",
                backgroundColor:"#deb8b8"
            }} onClick={handlePrev}>Prev</p>
            <p style={{
               fontWeight:"bold"
            }}>{page}</p>
            <p style={{
                border:"1px solid #deb8b8",
                padding:"10px",
                borderRadius:"50%",
                backgroundColor:"#deb8b8"
            }} onClick={handleNext}>Next</p>
        </div>
    );
};

export default Pagination;