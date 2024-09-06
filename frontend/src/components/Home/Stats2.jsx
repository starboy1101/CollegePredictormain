export default function Stats({ onSelectCourse, onGoToCart }) {
  return (
    <section className="stats_box py-10 grid place-items-center lg:grid-cols-5 grid-cols-2 gap-5 sm:w-9/12 w-11/12 mx-auto -mt-9 px-6">
      <div>
        <select
          className="md:text-[15px] text-[12px] font-bold p-2 border border-gray-300 rounded"
          onChange={(e) => onSelectCourse(e.target.value)}
        >
          <option value="">District</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </div>

      <div>
        <select
          className="md:text-[15px] text-[12px] font-bold p-2 border border-gray-300 rounded"
          onChange={(e) => onSelectCourse(e.target.value)}
        >
          <option value="">Branch</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </div>

      <div>
        <button className="md:text-[15px] text-[12px] font-bold p-2 bg-orange-500 text-white rounded w-full">
          Search
        </button>
      </div>

      <div>
        <button
          className="md:text-[15px] text-[12px] font-bold p-2 bg-orange-500 text-white rounded w-full"
          onClick={onGoToCart}
        >
          Go to cart
        </button>
      </div>
    </section>
  );
}
