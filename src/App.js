import { useEffect, useState } from "react";
import "./App.css";
import FormInput from "./components/FormInput";
import Select from "react-select";

const App = () => {
  const [values, setValues] = useState({
    username: "",
    // email: "",
    age: "",
    feesOfMonth: new Date(),
    batch: "",
  });
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setTimeout(() => {
        setLoading(true);
    }, 1)
}, []);
  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    // {
    //   id: 2,
    //   name: "email",
    //   type: "email",
    //   placeholder: "Email",
    //   errorMessage: "It should be a valid email address!",
    //   label: "Email",
    //   required: true,
    // },
    {
      id: 2,
      name: "feesOfMonth",
      type:"month",
      placeholder: "Fees for Month",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Fees for Month",
      required: true,
    },
    {
      id: 3,
      name: "age",
      type: "text",
      placeholder: "Age",
      pattern:"^(1[89]|[2-5][0-9]|6[0-5])$",
      errorMessage: "Age should be between 18 to 65",
      label: "Age",
    },
    
    // {
    //   id: 5,
    //   name: "batch",
    //   type: "select",
    //   placeholder: "Select Batch",
    //   errorMessage: "It is required",
    //   label: "Select Batch",
    //   pattern: values.password,
    //   required: true,
    // },
  ];

  const options = [
    { value: '6-7am', label: '6 - 7 AM' },
    { value: '7-8am', label: '7 - 8 AM' },
    { value: '8-9am', label: '8 - 9 AM' },
    { value: '5-6pm', label: '5 - 6 PM' }
  ]

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(values)
  };

  return (
    
    <div className="app">
      {loading?
      <form onSubmit={handleSubmit}>
        <h1>Yoga Registration Form</h1>
        <h3>Monthly Fee - ₹500</h3>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <div>
        <label>Select your Batch</label>
        <Select options={options} name="batch"  onChange={(e) => {
    setValues({ ...values, batch: e.value });
  }} />
        </div>
        <button>Pay your Fees</button>
      </form>:
    <div className="yoga"></div>}
    </div>
    
  );
};

export default App;