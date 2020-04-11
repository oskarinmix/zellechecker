import { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

const getFileName = (file) => {
  const ind = file.name.lastIndexOf(".");
  const name = file.name.slice(0, file.name.lastIndexOf("."));
  const ext = file.name.slice(ind);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const d = new Date();
  const year = d.getFullYear();
  const month = monthNames[d.getMonth()];
  return `captures-${month}-${year}/${name}-${Date.now()}${ext}`;
};

const useStorage = () => {
  const [percentage, setPercentage] = useState(0);
  const [picture, setPicture] = useState(null);

  const uploadFile = (file) => {
    const filename = getFileName(file);
    const storageRef = firebase.storage().ref(filename);
    const task = storageRef.put(file);
    setPercentage(1);
    task.on(
      "state_changed",
      (snapshot) => {
        let per = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPercentage(per);
      },
      (error) => {
        console.log(error.message);
      },
      () => {
        storageRef.getDownloadURL().then((url) => {
          setPicture(url);
          setPercentage(100);
        });
      }
    );
  };
  return { percentage, picture, uploadFile, setPicture, setPercentage };
};

export default useStorage;
