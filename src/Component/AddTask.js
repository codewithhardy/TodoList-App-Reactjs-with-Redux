import React, { useState } from "react";
import { toast } from "react-toastify";
// import DatePicker from "react-datepicker";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
function AddTask() {
  const [name, setName] = useState("");
  const [radio, setRadio] = useState("male");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [isChecked, setIsChecked] = useState("false");
  const [taskName, setTaskName] = useState("");
  const [dropDown, setDropdown] = useState("Sports");

  // const [startDate, setStartDate] = useState(new Date());

  const tasks = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    const checkName = tasks.find((task) => task.name === name && name);
    if (!name || !radio || !age || !name) {
      return toast.warning("Please add all details!");
    }
    if (checkName) {
      return toast.error("This Name is Already Exists");
    }

    const data = {
      id: tasks[tasks.length - 1].id + 1,
      name,
      radio,
      email,
      age,
      isChecked,
      taskName,
      dropDown,
    };
    dispatch({ type: "ADD_TASK", payload: data });
    toast.success("Task Added Successfully");
    history.push("/");
  };

  return (
    <div className="container">
      <h2 className="display-3 my-5 text-center">Add Task</h2>
      <div className="row">
        <div className="col-md-6 shadow mx-auto p-5">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="User Name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-check-label">Male</label>
              <input
                type="radio"
                placeholder="gender"
                className="form-check-input"
                checked={radio === "male"}
                value="male"
                onChange={(e) => setRadio(e.target.value)}
              />
              <label className="form-check-label">Female</label>
              <input
                type="radio"
                placeholder="Name"
                className="form-check-input"
                checked={radio === "female"}
                value="female"
                onChange={(e) => setRadio(e.target.value)}
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                placeholder="Age"
                className="form-control"
                min={18}
                max={55}
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            <div className="form-group">
              <lable>Hobby : </lable>
              <select
                value={dropDown}
                onChange={(e) => setDropdown(e.target.value)}
              >
                <option value="sports">Sports</option>
                <option value="reading">Reading</option>
                <option value="music">Music</option>
              </select>
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Task Name"
                className="form-control"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Status: </label>
              {isChecked ? " Active" : " Inactive"}
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.value)}
              />
            </div>

            {/* <div className="form-group">
              <lable>Date</lable>
              <DatePicker
                selected={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div> */}
            <div className="form-group">
              <input
                type="submit"
                value="Add Task"
                className="btn btn-block btn-dark"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTask;
