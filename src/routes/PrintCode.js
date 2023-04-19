import React, { useRef } from 'react';
import Barcode from 'react-barcode';
import ReactToPrint from 'react-to-print';
import { useLocation, useNavigate } from "react-router-dom";


const pageStyle = `
    @page {
        size: 29mm 19mm
    };
    @media all {
        .pageBreak {
            display: none
        }
    };
    @media print {
        .pageBreak {
            page-break-before: always;
        }
    };
`

function PrintCode() {

    const navigate = useNavigate()
    const location = useLocation();
    const cod = location.pathname.split("/")[2];
    const ref = useRef()

    return (
        <div>
            <div>
                <Barcode width={0.7} height={50} ref={ref} value={cod} fontSize="16" />
            </div>
            <ReactToPrint
                trigger={() => <button>Print</button>}
                content={() => ref.current}
                pageStyle={pageStyle}
            />
            <button 
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => { navigate(`/stockCount`) }} >
                    Volver
            </button>
        </div>
    );
}
export default PrintCode;