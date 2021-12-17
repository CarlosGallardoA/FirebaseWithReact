import React, { useState, useEffect } from "react";
import { db } from "../firebase";
function LinkForm({ addOrEditLink, currentId, links }) {
  const initialLink = {
    url: "",
    name: "",
    description: "",
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLink({ ...link, [name]: value });
  };
  const [link, setLink] = useState(initialLink);
  const handleSubmit = (e) => {
    e.preventDefault();
    addOrEditLink(link);
    setLink(initialLink);
  };
  const getLinkById = async (id) => {
    const doc = await db.collection("links").doc(id).get();
    setLink({ ...doc.data() });
  };
  useEffect(() => {
    if (currentId === "") {
      setLink(initialLink);
    } else {
      getLinkById(currentId);
    }
  }, [currentId]);
  return (
    <form className="card card-body" onSubmit={handleSubmit}>
      <div className="form-group input-group mb-3">
        <div className="input-group-text bg-light">
          <i className="material-icons">insert_link</i>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="url"
          name="url"
          onChange={handleInputChange}
          value={link.url}
        />
      </div>
      <div className="form-group input-group mb-3">
        <div className="input-group-text bg-light">
          <i className="material-icons">create</i>
        </div>
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder="Website name"
          onChange={handleInputChange}
          value={link.name}
        />
      </div>
      <div className="form-group mb-3">
        <textarea
          name="description"
          rows="3"
          className="form-control"
          placeholder="Website description"
          onChange={handleInputChange}
          value={link.description}
        ></textarea>
      </div>
      <button className="btn btn-primary">
        {currentId === "" ? "Save" : "Update"}
      </button>
    </form>
  );
}

export default LinkForm;
