import "./productCard.css";

export default function ProductCard(props) {
  console.log(props);

  return (
    <div className="max-w-xs bg-white rounded-2xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 p-4">
      <img
        src={props.image}
        alt={props.name}
        className="w-full h-48 object-cover rounded-lg"
      />
      <h1 className="text-xl font-semibold mt-4 text-gray-800">{props.name}</h1>
      <p className="text-gray-600 text-md mt-2">Price: ${props.price}</p>
      <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
        View More
      </button>
    </div>
  );
}


