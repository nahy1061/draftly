import { useEffect, useRef, useState } from "react";

// Shrinks the resume preview to fit the preview column without changing its layout size.
// CSS transform:scale doesn't affect layout, so we track a wrapper box at the scaled dimensions.
function ScaledPreviewWrapper({ children, printRef }) {
  const outerRef = useRef(null);
  const contentRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [scaledWidth, setScaledWidth] = useState(0);
  const [scaledHeight, setScaledHeight] = useState(0);

  useEffect(() => {
    function measureAndScale() {
      if (!outerRef.current || !contentRef.current) return;
      const availableWidth = outerRef.current.clientWidth;
      const naturalWidth = contentRef.current.offsetWidth;
      const naturalHeight = contentRef.current.offsetHeight;
      if (!naturalWidth) return;

      // Cap at 1 — only shrink to fit, never upscale (keeps text crisp)
      const nextScale = Math.min(1, availableWidth / naturalWidth);
      setScale(nextScale);
      setScaledWidth(naturalWidth * nextScale);
      setScaledHeight(naturalHeight * nextScale);
    }

    measureAndScale();

    // Re-measure when the column or resume content size changes
    const resizeObserver = new ResizeObserver(measureAndScale);
    if (outerRef.current) resizeObserver.observe(outerRef.current);
    if (contentRef.current) resizeObserver.observe(contentRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div ref={outerRef} className="w-full print:overflow-visible">
      <div
        style={{ width: scaledWidth || undefined, height: scaledHeight || undefined }}
        className="mx-auto overflow-hidden print:w-auto! print:h-auto! print:mx-0! print:overflow-visible! shadow-md rounded-lg print:shadow-none"
      >
        <div
          ref={(node) => {
            contentRef.current = node;
            // PrintButton needs the unscaled node so @media print gets full-size output
            if (printRef) printRef.current = node;
          }}
          style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
         className="inline-block print:block! print:transform-none!"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default ScaledPreviewWrapper;