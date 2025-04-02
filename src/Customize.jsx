import { useState } from "react";

function Customize() {
  const [bgColor, setBgColor] = useState("#E4D6A7");
  const [textColor, setTextColor] = useState("#0F0905");
  const [primaryColor, setPrimaryColor] = useState("hsl(9, 76%, 40%)");
  const [secondaryColor, setSecondaryColor] = useState("hsl(9, 76%, 35%)");
  const [accentColor, setAccentColor] = useState("hsl(195, 30%, 49%)");

  const generateCSS = () => {
    return `:root {
      --bg-color: ${bgColor};
      --text-color: ${textColor};
      --primary-color: ${primaryColor};
      --secondary-color: ${secondaryColor};
      --accent-color: ${accentColor};
    }`;
  };

  const downloadCSS = () => {
    const cssContent = generateCSS();
    const blob = new Blob([cssContent], { type: "text/css" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "theme.css";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h1>Customize Theme</h1>
      <label>Background Color:</label>
      <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
      <br />
      <button onClick={downloadCSS}>Download Theme</button>
    </div>
  );
}

export default Customize;
