import Checkbox from "./Checkbox";
import React, { useState } from "react";

const Options = () => {
  const [checkedItems, setCheckedItems] = useState({
    Basic: true,
    Voiced: true,
    Combo: true
  }); //plain object as state

  const handleChange = event => {
    // updating an object instead of a Map
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked
    });
    console.log(checkedItems);
  };

  const checkboxes = [
    {
      name: "Basic",
      key: "checkBox1",
      label: "Basic"
    },
    {
      name: "Voiced",
      key: "checkBox2",
      label: "Voiced"
    },
    {
      name: "Combo",
      key: "checkBox3",
      label: "Combo"
    }
  ];

  return (
    <div>
      {checkboxes.map(item => (
        <label key={item.key}>
          {item.name}
          <Checkbox
            name={item.name}
            checked={checkedItems[item.name]}
            onChange={handleChange}
          />
        </label>
      ))}
    </div>
  );
};

export default Options;
