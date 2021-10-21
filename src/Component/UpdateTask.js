import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { useHistory } from "react-router-dom";

function UpdateTask() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [radio, setRadio] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [dropDown, setDropdown] = useState("Sports");

  const { id } = useParams();
  const tasks = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const currentTask = tasks.find((task) => task.id === parseInt(id));

  useEffect(() => {
    if (currentTask) {
      setName(currentTask.name);
      setRadio(currentTask.radio);
      setEmail(currentTask.email);
      setAge(currentTask.age);
    }
  }, [currentTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const checkEmail = tasks.find(
      (task) => task.id !== parseInt(id) && task.email === email
    );
    const checkName = tasks.find(
      (task) => task.id !== parseInt(id) && task.name === name && name
    );
    if (!name || !radio || !age || !name) {
      return toast.warning("Please add all details!");
    }
    if (checkName) {
      return toast.error("This Name is Already Exists");
    }

    const data = {
      id: parseInt(id),
      name,
      radio,
      email,
      age,
      isChecked,
      taskName,
      dropDown,
    };
    dispatch({ type: "UPDATE_TASK", payload: data });
    toast.success("Task Updated Successfully");
    history.push("/");
  };
  return (
    <div className="container">
      {currentTask ? (
        <>
          <h2 className="display-3 my-5 text-center">Update Task {id}</h2>
          <div className="row">
            <div className="col-md-6 shadow mx-auto p-5">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Name"
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

                <div className="form-group"></div>
                <div className="form-group">
                  <input
                    type="submit"
                    value="Update Task"
                    className="btn btn-info"
                  />
                  <Link to="/" className="btn btn-warning ml-3">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <h1 className="display-3 my-5 text-center">Task Not Found{id}</h1>
      )}
    </div>
  );
}

export default UpdateTask;
