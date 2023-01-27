import React, { useEffect, useRef } from 'react'

function PdfViewerComponent(props) {
    const containerRef = useRef();

    useEffect(()=>{
        const container = containerRef.current;
        let instance,PSPDFKit;

        (async function(){
            PSPDFKit = await import('pspdfkit');
            instance = await PSPDFKit.load({
                container,
                document:props.document,
                baseUrl: `${window.location.protocol}//${window.location.host}/${process.env.PUBLIC_URL}`,
            })
        })();
        return()=> PSPDFKit && PSPDFKit.unload(container);

    },[])
    return (
        <div ref={containerRef} style={{width:"100%",height:"100vh"}}>
            
        </div>
    )
}

export default PdfViewerComponent
