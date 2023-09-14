import React, { useState } from "react";
import "../index.css";

const Categories = ({ data, selected }) => {
  const [clicked, setClicked] = useState({});

  const selection = (item, i) => {
    setClicked((prev) => ({ ...prev, [i]: !prev[i] }));
    const st = selected.indexOf(item);
    if (st === -1) {
      selected.push(item);
    } else {
      selected.splice(st, 1);
    }
  };

  return (
    <div className="m-4">
 
      <h1
        style={{fontWeight: "420", fontSize: "40px", textAlign: "left"}}
        className="row p-4 display-4 heading">
        Please select the areas where you think the individual is struggling.
      </h1>
      <p className="row lead text-dark" style={{padding: "1.5rem 73px 1.5rem 2.5rem"}}>
        Signs of LDs can be detected in children as young as 4. But often, signs
        don’t show up (or are not noticed) until grades 3-5 —or even later in
        life. And of course, no two people are exactly alike, even if they have
        the same type of LD.
      </p>
          <div className="row">
    <div className="col-md-8">
            {data.map((item, i) => (
              <button
                key={i}
                style={{
                  backgroundColor: `${clicked[i] ? "#4bb3f9" : ""}`,
                  color: `${clicked[i] ? "white" : "#4bb3f9"}`,
                }}
                onClick={() => selection(item, i)}
                className="col-md-3  p-5 m-3 grade"
              >
                <p style={{fontWeight: 700,color:"black"}}>{item.name}</p>
              </button>
            ))}
          </div>
    <div style={{height:"400px"}} className="did_you mt-5 col-md-4 text-center">
          <h1 className="p-3 mt-4"  style={{color: "white"}}>Did you know?</h1>
          <br />
          <p className="m-2 did_you_know">
            Many children with dyslexia also have dyscalculia. And almost half
            of the children who have ADHD also have LD. Learn more from NCLD’s
            “The State of LD” report.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Categories;
