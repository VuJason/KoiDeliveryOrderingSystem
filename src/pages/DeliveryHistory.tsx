import Footer from "../components/Footer";
import Header from "../components/Header";
import TrackOrder from "../components/TrackOrder";

const DeliveryHistory = () => {
  const deliveries = [
    {
      id: "001",
      product: "Laptop",
      address: "123 Main St, City",
      edd: "2023-05-15",
      price: "$999",
      type: "Express",
      status: "In Transit",
    },
    {
      id: "002",
      product: "Smartphone",
      address: "456 Elm St, Town",
      edd: "2023-05-16",
      price: "$599",
      type: "Standard",
      status: "Delivered",
    },
    // Add more sample data as needed
  ];
  return (
    <div className="bg-white min-h-screen text-black">
      <Header />

      <main className="w-full pb-16">
        <div className="relative w-full h-[800px]">
          <img
            src="./bg.png"
            alt="Delivery Service Banner"
            className="w-full h-full object-cover "
          />
          <div className="absolute inset-0 pr-96 bg-opacity-50 flex p-20 flex-col justify-center items-start text-center">
            <h1 className="text-4xl text-white text-left md:text-6xl font-bold mb-6 leading-tight">
              Deliveries Available
            </h1>
            <p className="text-white text-xl md:text-2xl font-semibold text-left">
              We provide an integrated logistics solution built on Express
              Parcel, Cross Border, Warehousing, Freight and Software value
              added services that helps brands deliver faster and provide a
              superior experience
            </p>
          </div>
        </div>

        <div className="mt-10 px-4">
          <div className="px-20 space-y-10">
            <div className="px-40">
              <h2 className="text-3xl md:text-4xl font-normal mb-6 leading-tight text-center">
                Track your order promptly
              </h2>
              <p className="text-center">
                We provide an integrated logistics solution built on Express
                Parcel, Cross Border, Warehousing, Freight and Software value
                added services that helps brands deliver faster and provide a
                superior experience
              </p>
            </div>

            <TrackOrder />
          </div>
        </div>
        <div className="mt-10 px-4">
          <div className="px-20 space-y-10">
            <div className="mt-16">
              <h2 className="text-3xl font-bold mb-6">Your deliveries</h2>
              <div className="overflow-x-auto rounded-lg shadow">
                <table className="w-full border-collapse bg-white">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border-b p-3 text-left">Order ID</th>
                      <th className="border-b p-3 text-left">Product</th>
                      <th className="border-b p-3 text-left">
                        Delivery Address
                      </th>
                      <th className="border-b p-3 text-left">EDD</th>
                      <th className="border-b p-3 text-left">Price</th>
                      <th className="border-b p-3 text-left">Type</th>
                      <th className="border-b p-3 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deliveries.map((delivery) => (
                      <tr key={delivery.id}>
                        <td className="border-b p-3">{delivery.id}</td>
                        <td className="border-b p-3">{delivery.product}</td>
                        <td className="border-b p-3">{delivery.address}</td>
                        <td className="border-b p-3">{delivery.edd}</td>
                        <td className="border-b p-3">{delivery.price}</td>
                        <td className="border-b p-3">{delivery.type}</td>
                        <td className="border-b p-3">{delivery.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DeliveryHistory;
