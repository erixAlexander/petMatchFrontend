import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import "./CustomSelect.css";

const CustomSelect = ({ array, selected, setSelected }) => {
  const [open, setOpen] = useState(false);
  const dummyArray = [1, 2, 3];

  return (
    <div className="select-container">
      <div onClick={() => setOpen((prev) => !prev)} className="selected">
        {selected || "Please Select"}
        <FontAwesomeIcon
          icon={open ? faAngleUp : faAngleDown}
          style={{ fontSize: 14 }}
        />
      </div>
      <div className={open ? "options-active" : "options"}>
        {(array || dummyArray).map((item, i) => (
          <div
            key={i}
            className="option"
            onClick={() => {
              setSelected(item);
              setOpen(false);
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomSelect;
