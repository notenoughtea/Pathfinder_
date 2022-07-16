import ImageGallery, { getCurrentIndex } from "react-image-gallery";
import { Accordion, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { axiosGallery } from "../../../store/gallerySlice";

function MyDropzone() {
  const { id } = useParams();
  const userId = localStorage.id;
  const onDrop = useCallback((acceptedFiles) => {
    const formData = new FormData();
    formData.append("333", acceptedFiles[0]);
    formData.append("user_id", userId);
    formData.append("routes_id", id);
    try {
      axios.post("/upload/image", formData);
    } catch (error) {}
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Card>
          <Card.Body>Кладите сюда</Card.Body>
        </Card>
      ) : (
        <Card>
          <Card.Body>
            Перетащите сюда или кликните для добавления фото
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export default function Gallery() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const images = useSelector((state) => state.gallery.photo);
  const [reload, setReload] = useState(true);

  useEffect(() => {
    dispatch(axiosGallery(id));
  }, [reload]);

  function handler() {
    setReload((prev) => !prev);
  }

  function deletePhoto(e) {}

  return (
    <>
      <Accordion
        onMouseMove={(e) => handler()}
        style={{ marginBottom: "20px" }}
      >
        <Accordion.Item eventKey="0">
          <Accordion.Header>Добавить свое фото</Accordion.Header>
          <Accordion.Body>
            <MyDropzone />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      {/* <Form.Group controlId="formFileLg" className="mb-3">
        <Form.Label>Large file input example</Form.Label>
        <Form.Control type="file" size="lg" />
      </Form.Group> */}
      {images.length ? (
        <ImageGallery onClick={(e) => deletePhoto(e)} items={images} />
      ) : (
        <div></div>
      )}
    </>
  );
}
