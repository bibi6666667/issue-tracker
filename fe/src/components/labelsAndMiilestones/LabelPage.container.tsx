import { useState } from "react";
import { useRecoilState } from "recoil";
import { currLabelsState } from "utils/states";
import { useEffect } from "react";
import { URL } from "utils/urls";
import Presenter from "./Presenter";

function LabelPageContainer() {
  const [labelState, setLabelState] = useRecoilState(currLabelsState);
  const [open, setOpenState] = useState(false);

  useEffect(() => {
    const labels = sessionStorage.getItem("labels");
    if (labels) {
      setLabelState([...JSON.parse(labels)]);
      return;
    }
    const request = async () => {
      const response = await fetch(URL.endPoint("label"));
      const json = await response.json();
      setLabelState([...json.data]);
      sessionStorage.setItem("labels", JSON.stringify([...json.data]));
    };
    request();
  }, []);

  const handleOpenModal = () => {
    setOpenState(true);
  };

  const handleCloseModal = () => {
    setOpenState(false);
  };

  return <Presenter {...{ handleOpenModal, handleCloseModal, labelState, open }} page="label" />;
}

export default LabelPageContainer;
