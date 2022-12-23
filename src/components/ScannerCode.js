import { useState, useRef } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { QRCodeCanvas } from "qrcode.react";
import { CardHeader } from "@mui/material";

const ScannerCode = () => {
  const [url, setUrl] = useState("");
  const qrRef = useRef(); // for later use
  const [isSubmitted, setIsSubmitted] = useState(false);

  const urlSubmitted = (event) => {
    event.preventDefault();
    setUrl(event.target.querySelector("input").value);
    setIsSubmitted(true);
  };

  const clearInput = (event) => {
    setUrl("");
  };

  const downloadQRCode = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const image = canvas.toDataURL("image/png");
    const anchor = document.createElement("a");
    anchor.href = image;
    anchor.download = `${url}.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  return (
    <Container maxWidth="xs">
      <article className="form-container">
        <Box
          component="form"
          autoComplete="off"
          sx={{ mt: 10 }}
          onSubmit={urlSubmitted}
        >
          <TextField
            id="url-text"
            type="url"
            label="Enter your url"
            variant="outlined"
            required
          />

          <Stack
            id="button-container"
            spacing={2}
            direction="row"
            sx={{ my: 2 }}
            justifyContent="end"
          >
            <Button variant="outlined" type="reset" onClick={clearInput}>
              Reset
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Stack>
          {isSubmitted && url ? (
            <>
              <CardHeader title={url}>{url}</CardHeader>
              <Card variant="none" ref={qrRef}>
                <QRCodeCanvas
                  id="qrCode"
                  value={isSubmitted ? url : ""}
                  size={400}
                  bgColor={"#fff"}
                  level={"H"}
                />
              </Card>
              <Button
                id="btn-download"
                variant="contained"
                color="success"
                type="submit"
                onClick={downloadQRCode}
              >
                Download
              </Button>{" "}
            </>
          ) : null}
        </Box>
      </article>
    </Container>
  );
};

export default ScannerCode;
