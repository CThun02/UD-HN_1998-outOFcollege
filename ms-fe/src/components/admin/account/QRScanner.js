import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useState } from "react";

function QRScanner(props) {
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    const html5QrCodeScanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    html5QrCodeScanner.render(success, error);

    function success(result) {
      html5QrCodeScanner.clear();
      setScanResult(result);
      console.log(result);
      props.onScan(result); // Gọi hàm callback onScan và truyền kết quả quét QR code
    }

    function error(err) {
      console.warn(err);
    }
  }, []);

  return (
    <div>
      {scanResult ? (
        <div>
          success: <a href={"http://" + scanResult}>{scanResult}</a>
        </div>
      ) : (
        <div id="reader"></div>
      )}
    </div>
  );
}
export default QRScanner;
