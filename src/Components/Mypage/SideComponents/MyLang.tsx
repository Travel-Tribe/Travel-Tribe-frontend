interface MyLangs {
  lang: string[];
}
const MyLang = ({ lang }: MyLangs): JSX.Element => {
  return (
    <div className="mb-8">
      <h4 className="text-lg font-bold">가능 언어</h4>
      <div className="flex mt-2">
        {lang.map((language, index) => (
          <div
            key={index}
            className="w-16 h-5 text-sm rounded-lg bg-custom-blue text-white text-center m-2.5 flex items-center justify-center"
          >
            {language}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyLang;
