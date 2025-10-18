export function concatBuffers(buf1, buf2) {
  const newBuf = new ArrayBuffer(buf1.byteLength + buf2.byteLength);
  const view = new DataView(newBuf);

  const view1 = new DataView(buf1);
  const view2 = new DataView(buf2);

  for (let i = 0; i < buf1.byteLength; i++) {
    view.setUint8(i, view1.getUint8(i));
  }

  for (let i = 0; i < buf2.byteLength; i++) {
    view.setUint8(i + buf1.byteLength, view2.getUint8(i));
  }

  return newBuf;
}