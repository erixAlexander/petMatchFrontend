import "./CustomCheckbox.css";

const CustomCheckbox = ({ options, values, setvalues }) => {
  const dummyArray = [
    { value: "one", label: "one" },
    { value: "two", label: "two" },
    { value: "three", label: "three" },
    { value: "four", label: "four" },
  ];

  return (
    <div className="checkbox-container">
      {(options || dummyArray).map((item, index) => {
        return (
          <div className="checkbox-item" key={index}>
            <input
              type="checkbox"
              id={item.value}
              name={item.value}
              value={values[item.value]}
              checked={values[item.value]}
              onChange={(e) => {
                setvalues({ ...values, [e.target.name]: e.target.checked });
              }}
            />
            <label htmlFor={item.value}>{item.label}</label>
          </div>
        );
      })}
    </div>
  );
};

export default CustomCheckbox;
