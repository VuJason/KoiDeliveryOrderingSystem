import { useSearchParams } from 'react-router-dom';

const PaymentResult = () => {
  const [searchParams] = useSearchParams();

  const responseCode = searchParams.get('vnp_ResponseCode');
  const amount = Number(searchParams.get('vnp_Amount')) / 100; // Convert to VND
  const orderInfo = searchParams.get('vnp_OrderInfo');
  const transactionNo = searchParams.get('vnp_TransactionNo');
  const bankCode = searchParams.get('vnp_BankCode');
  const payDate = searchParams.get('vnp_PayDate');

  const isSuccess = responseCode === '00';

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className={`text-center mb-6 ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
        <h2 className="text-2xl font-bold">
          {isSuccess ? 'Payment Successful!' : 'Payment Failed'}
        </h2>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="font-medium">Amount:</span>
          <span>{amount.toLocaleString('vi-VN')} VNĐ</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Order Info:</span>
          <span>{orderInfo}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Transaction No:</span>
          <span>{transactionNo}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Bank:</span>
          <span>{bankCode}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">Payment Date:</span>
          <span>{payDate}</span>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button 
          onClick={() => window.location.href = '/'}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentResult;
