import { useState } from "react";
import { useRecoilState } from "recoil";
import { currMilestoneState } from "utils/states";
import { useEffect } from "react";
import { URL } from "utils/urls";
import Presenter from "./Presenter";

function MilestoneContainer() {
  const [milestoneState, setMileStoneState] = useRecoilState(currMilestoneState);
  const [open, setOpenState] = useState(false);

  useEffect(() => {
    const request = async () => {
      const response = await fetch(URL.endPoint("milestone"));
      const json = await response.json();
      setMileStoneState([...json.data]);
      sessionStorage.setItem("milestones", JSON.stringify([...json.data]));
    };
    request();
  }, []);

  const handleOpenModal = () => {
    setOpenState(true);
  };

  const handleCloseModal = () => {
    setOpenState(false);
  };

  return (
    <Presenter {...{ handleOpenModal, handleCloseModal, milestoneState, open }} page="milestone" />
  );
}

export default MilestoneContainer;
