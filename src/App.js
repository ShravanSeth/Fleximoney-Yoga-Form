import { useEffect, useState } from "react";
import "./App.css";
import FormInput from "./components/FormInput";
import Select from "react-select";
import Service from "./services/httpService";
import Modal from 'react-modal';

const App = () => {

  //LOADER
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setTimeout(() => {
        setLoading(true);
    }, 5000)
}, []);

  //VARIABLES
  const services = new Service();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [res, setRes]= useState("")
  const [values, setValues] = useState({
    username: "",
    age: "",
    feesOfMonth: new Date(),
    batch: "",
  });
  
  //MODAL CSS
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      width:'35%',
      textAlign:'center',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  
  //INPUTS
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
    {
      id: 2,
      name: "feesOfMonth",
      type:"month",
      placeholder: "Fees for Month",
      errorMessage:
        "Enter the Month",
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
      required:true,
    },
  ];

  const options = [
    { value: '6-7am', label: '6 - 7 AM' },
    { value: '7-8am', label: '7 - 8 AM' },
    { value: '8-9am', label: '8 - 9 AM' },
    { value: '5-6pm', label: '5 - 6 PM' }
  ]

  //MODAL FUNCTIONS
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  //FORM FUNCTIONS
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(values)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    services.post("/fees/payfees",values).then((res)=>{
      setRes(res.data.message);
      openModal();
    }).catch((res)=>{
      setRes(res.data.message);
      openModal();
    })
  };

  return (
    <div className="app">
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={closeModal}
      >
        <h2 >{res}</h2>
        <button onClick={closeModal}>close</button>

      </Modal>
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
        <Select required={true} options={options} name="batch"  onChange={(e) => {
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