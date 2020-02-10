import Checkbox from "./Checkbox";
import React, { useState, useEffect } from "react";

const Options = props => {
  const [checkedItems, setCheckedItems] = useState({
    Basic: true,
    Voiced: true,
    Combo: true
  }); //plain object as state

  const handleChange = event => {
    // updating an object instead of a Map
    const updateObject = {
      ...checkedItems,
      [event.target.name]: event.target.checked
    };
    setCheckedItems(updateObject);
    console.log(checkedItems);
    const toSend = checkedItems;
    props.callBack(updateObject);
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
