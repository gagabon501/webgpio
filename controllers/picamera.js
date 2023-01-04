import { StreamCamera, Codec } from "pi-camera-connect";
import * as fs from "fs";

// Capture 5 seconds of H264 video and save to disk
exports.picamera = async (req, res) => {
  const runApp = async () => {
    const streamCamera = new StreamCamera({
      codec: Codec.H264,
    });

    const videoStream = streamCamera.createStream();

    //   const writeStream = fs.createWriteStream("video-stream.h264");

    //   videoStream.pipe(writeStream);

    await streamCamera.startCapture();
    videoStream.on("data", (data) => console.log("New data", data));
    videoStream.on("end", (data) => console.log("Video stream has ended"));

    // Wait for 5 seconds
    await new Promise((resolve) => setTimeout(() => resolve(), 5000));

    await streamCamera.stopCapture();
  };
  runApp();

  //   //   await new Promise((resolve) => setTimeout(() => resolve(), 5000));
  //   videoStream.on("data", (data) => {
  //     console.log("New data", data);

  //     res.writeHead(200, {
  //       "Cache-Control":
  //         "no-store, no-cache, must-revalidate, pre-check=0, post-check=0, max-age=0",
  //       Pragma: "no-cache",
  //       Connection: "close",
  //       "Content-Type": "multipart/x-mixed-replace; boundary=--myboundary",
  //     });

  //     res.write(
  //       `--myboundary\nContent-Type: image/jpg\nContent-length: ${data.length}\n\n`
  //     );

  //     res.write(data, function () {
  //       console.log(`data written: ${data}`);
  //     });

  //     req.on("close", () => await streamCamera.stopCapture());
  //   });
};
