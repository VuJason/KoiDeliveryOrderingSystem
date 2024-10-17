import React, { useState, useRef, useEffect } from "react";

type InputProps = {
  length?: number;
  error?: string;
  onComplete: (otp: string) => void;
  setError: (error: string) => void;
  onChange: (otp: string) => void;
};

const OTPInput: React.FC<InputProps> = ({
  length = 6,
  onComplete,
  error,
  setError,
  onChange,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill("")); // Dynamically create OTP array based on length

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0]?.focus();
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    onChange(newOtp.join(""));
    setError("");

    if (value !== "" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // If the last input is filled, trigger onComplete callback
    if (newOtp.every((digit) => digit !== "")) {
      onComplete(newOtp.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="w-full">
      <p className=" mb-6 text-gray-800">Enter the code sent to your Mail</p>
      <div className="flex flex-row justify-between mb-6">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            ref={(el) => (inputRefs.current[index] = el)}
            className={`w-24 h-24 border-2 rounded-lg text-center text-xl font-semibold ${
              error ? "border-red-500" : "border-gray-300"
            } focus:border-blue-500 focus:outline-none transition-all duration-300 mb-2 sm:mb-0`}
            aria-label={`Digit ${index + 1}`}
          />
        ))}
      </div>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
    </div>
  );
};

export default OTPInput;
