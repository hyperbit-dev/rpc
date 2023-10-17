import { QRCodeCanvas } from "qrcode.react";

export function QRGenerator({ id, value }: { id: string; value: string }) {
  return (
    <QRCodeCanvas
      id={id}
      value={`"${value}"`}
      size={128}
      bgColor="#ffffff"
      fgColor="#000000"
      includeMargin
      imageSettings={{
        src: '/logo-qr-code.png',
        height: 20,
        width: 20,
        excavate: true,
     }}
    />
  );
}
