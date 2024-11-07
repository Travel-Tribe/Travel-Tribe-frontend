interface MyCountrys {
  countries?: string[];
}

const CountryName = ({ countries = [] }: MyCountrys): JSX.Element => {
  return (
    <div className="mb-8">
      <h4 className="text-lg font-bold">다녀온 국가</h4>
      {countries.length > 0 && (
        <div className="flex">
          {countries.map((country, index) => (
            <div
              key={index}
              className="h-6 badge text-sm rounded-lg border border-black bg-white text-center m-2.5 flex items-center justify-center"
            >
              {country}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountryName;
