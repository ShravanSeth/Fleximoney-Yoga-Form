# API DEOCUMENTATION
---

1. / - GET
```
RESPONSE
    {
    success:true,
    message: "API is Running"
    }
```

2. /fees/payfees - POST
```
REQUEST
{
  "username":"xoz",
  "age":"50",
  "feesOfMonth":"2022-01",
  "batch":"5 - 7 AM"
}
```
```
RESPONSE
    - FOR NEW USER
        {
        success:true,
        message:"Fees Paid Successfully"
        }
        
    - FOR EXISTING USERS (PAYING FEES FOR A NEW MONTH)
      - SUCCESS
        {
        success:true,
        message:"Fees Updated Successfully"
        }
      - FAILURE
        {
        success:false,
        message:"You have already paid the fees for this month"
        }
    - FAILURE
       {
       success:false,
       message:"Some error occured"
       }    
```
