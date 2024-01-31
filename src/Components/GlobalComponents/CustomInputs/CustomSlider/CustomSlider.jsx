import { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./CustomSlider.css";

export default ({ value, setValue }) => {
  return (
    <div className="slider-container">
      <p className="slider-title">
        Distance you would like to meet new friends
      </p>
      <Slider
        min={0}
        max={200}
        step={20}
        defaultValue={60}
        value={value}
        onChange={(val) => setValue(val)}
        marks={{
          0: "0",
          20: "20",
          40: "40",
          60: "60",
          80: "80",
          100: "100",
          120: "120",
          140: "140",
          160: "160",
          180: "180",
          200: "200",
        }}
      />
    </div>
  );
};
