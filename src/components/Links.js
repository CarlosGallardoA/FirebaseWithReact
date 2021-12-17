import React, { useEffect, useState } from "react";
import LinkForm from "./LinkForm";
import { toast } from "react-toastify";
import { db } from "../firebase";
function Links() {
  const [links, setLinks] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const getLinks = async () => {
    db.collection("links").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setLinks(docs);
    });
  };

  useEffect(() => {
    getLinks();
  }, []);
  const addOrEditLink = async (link) => {
    if (currentId === "") {
      await db.collection("links").doc().set(link);
      toast("Link saved successfully", {
        type: "success",
        autoClose: 2000,
      });
    } else {
      await db.collection("links").doc(currentId).update(link);
      toast("Link updated successfully", {
        type: "info",
        autoClose: 2000,
      });
      setCurrentId("");
    }
  };
  const onDeleteLink = async (id) => {
    if (window.confirm("Are you sure you want to delete this link?")) {
      await db.collection("links").doc(id).delete();
      toast("Link deleted successfully", {
        type: "error",
        autoClose: 2000,
      });
    }
    return;
  };
  return (
    <>
      <div className="col-md-4 p-2">
        <LinkForm {...{ addOrEditLink, currentId, links }} />
        <div className="col-md-8 p-2">
          {links.map((link) => (
            <div className="card mb-1" key={link.id}>
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h4>{link.name}</h4>
                  <div>
                    <i
                      className="material-icons cursor-pointer"
                      onClick={() => setCurrentId(link.id)}
                    >
                      create
                    </i>
                    <i
                      className="material-icons text-danger cursor-pointer"
                      onClick={() => onDeleteLink(link.id)}
                    >
                      close
                    </i>
                  </div>
                </div>
                <p>{link.description}</p>
                <a href={link.url} target="_blank" rel="noreferrer">
                  Go to Website
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Links;
