import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [amount, setAmount] = useState(0);
  const handleClick = async () => {
    const result = await axios.post(
      "http://95.216.249.159:3003/api/invoice/create",
      { price: amount }
    );

    console.log("result = ", result);
    const invoiceId = result.data.invoiceId;

    const baseUrl = "http://95.216.249.159:5174/";
    const url = new URL(baseUrl);
    url.searchParams.append("invoiceId", invoiceId);

    // Redirect to the constructed URL
    window.location.href = url.toString();
  };

  return (
    <div className="flex flex-col items-center gap-3">
      Test Page
      <div>
        <input
          value={amount}
          onChange={(e) => {
            setAmount(Number(e.target.value));
          }}
        ></input>{" "}
        $
      </div>
      <button className="bg-red-500" onClick={handleClick}>
        Purchase
      </button>
    </div>
  );
}

export default App;
