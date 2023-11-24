// import React, { useEffect, useRef } from "react";
// import { BrowserQRCodeReader } from "@zxing/library";
// import { BarcodeFormat, BarcodeScanner } from "react-zxing";

// const GenerateQRCode = ({ qrCodeData }) => {
//   const reader = useRef(new BrowserQRCodeReader());

//   useEffect(() => {
//     generateQRCode();
//   }, []);

//   const generateQRCode = () => {
//     const canvas = document.createElement("canvas");
//     reader.current
//       .decodeFromInputVideoDevice(undefined, "video")
//       .then(() => {
//         return reader.current
//           .decodeOnceFromSource(
//             canvas.getContext("2d"),
//             BarcodeFormat.QR_CODE,
//             qrCodeData
//           )
//           .then((result) => {
//             console.log(result);
//           })
//           .catch((error) => {
//             console.error(error);
//           });
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   return (
//     <div>
//       <BarcodeScanner
//         onDetected={() => {}}
//         width={300}
//         height={300}
//         facingMode="environment"
//         id="video"
//       />
//     </div>
//   );
// };

// export default GenerateQRCode;
