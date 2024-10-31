interface MyCountrys {
  countries: string[];
}

const CountryName = ({ countries }: MyCountrys): JSX.Element => {
  return (
    <div className="mb-8">
      <h4 className="text-lg font-bold">다녀온 국가</h4>
      <div className="flex mt-2">
        {countries.map((country, index) => (
          <div
            key={index}
            className="w-16 h-5 text-sm rounded-lg bg-custom-pink text-white text-center m-2.5 flex items-center justify-center"
          >
            {country}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryName;
