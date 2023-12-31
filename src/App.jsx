/* eslint-disable no-unused-vars */
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import "./App.css";

function App() {
  const [urlImagen, setUrlImagen] = useState("");
  const [withoutImage, setWithoutImage] = useState(false);
  const [error, setError] = useState(false);
  const [imageUploaded, setImageUpload] = useState(false);

  const API_URL = "https://api.cloudinary.com/v1_1/djdly2tf7/image/upload";

  const onDrop = useCallback((acceptedFiles) => {}, []);
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop });

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);
    formData.append("upload_preset", "x3zos2s0");
    formData.append("api_key", "982777293155418");
    if (acceptedFiles.length === 0) {
      setWithoutImage(true);
      setTimeout(() => {
        setWithoutImage(false);
      }, 3000);
    } else {
      try {
        const res = await fetch(API_URL, { method: "POST", body: formData });
        const data = await res.json();
        console.log(data);
        setUrlImagen(data.url);
        setImageUpload(true);
      } catch (error) {
        setError(true);
        setInterval(() => {
          setError(false);
        }, 2000);
      }
    }
  }
  return (
    <div>
      <h1>Sube tus imagenes 📷</h1>
      <form onSubmit={handleSubmit}>
        <div {...getRootProps()} className="dropZone">
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Suelta las imagenes aqui ...</p>
          ) : (
            <p>
              Arrastra y suelta algunas imagenes o da click para seleccionar
            </p>
          )}
        </div>
        <div>
          <strong className="error">
            {error ? "Upps ocurrio algo, intentalo denuevo" : ""}
          </strong>
          <strong className="success">
            {imageUploaded ? "Imagenes subidas con exito" : ""}
          </strong>
          <strong className="error">
            {withoutImage ? "Seleccione una imagen" : ""}
          </strong>
        </div>

        {acceptedFiles[0] && (
          <img
            src={URL.createObjectURL(acceptedFiles[0])}
            alt=""
            style={{
              width: "200px",
              height: "150px",
            }}
          />
        )}
        <div>
          <button className="sendButton">Subir imagenes</button>
        </div>
        <br />
        {urlImagen ? (
          <a target="_blank" rel="noreferrer" href={urlImagen}>
            Ver Imagen
          </a>
        ) : (
          ""
        )}
      </form>
    </div>
  );
}

export default App;
