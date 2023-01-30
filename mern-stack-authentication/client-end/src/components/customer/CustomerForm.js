import axios from "axios";
import React, { useState } from "react";

function CustomerForm({ getCustomers }) {
  const [customerName, setCustomerName] = useState("");
  const [error, setError] = useState("");

  async function saveCustomer(e) {
    e.preventDefault();

    try {
      const customerData = {
        name: customerName,
      };
      await axios.post("http://localhost:5000/customer/", customerData);
      //   await axios.post(
      //     "https://mern-auth-template-tutorial.herokuapp.com/customer/",
      //     customerData
      //   );
      setError("");
      setCustomerName("");
      getCustomers();
    } catch (err) {
      console.error(err);
      setError(err.response.data.message);
    }
  }

  // const sortData = async (sortBy) => {
  //   console.log(sortBy);

  //   await axios.post(`http://localhost:5000/customer/?sort=${sortBy}`);
  // };

  return (
    <div>
      <form onSubmit={saveCustomer}>
        <input
          type="text"
          placeholder="Customer name"
          onChange={(e) => {
            setCustomerName(e.target.value);
          }}
          value={customerName}
        />
        <button className="btn btn-primary mx-1" type="submit">
          Save new customer
        </button>
        {error ? <div>{error}</div> : ""}
      </form>
      <button
        className="btn btn-primary m-2 py-2"
        // onClick={() => sortData("asc")}
      >
        Sort customers
      </button>
    </div>
  );
}

export default CustomerForm;
