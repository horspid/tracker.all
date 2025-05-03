import SearchICO from "@assets/images/icons/search.svg?react";

interface SearchProps {
  name?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const Search = ({ name, onChange, value }: SearchProps) => {
  return (
    <div className="relative flex items-center">
      <input
        value={value}
        type="text"
        className="rounded-2xl w-400 pl-60 h-60 text-lg text-grey font-semibold bg-lightdark outline-0 placeholder-grey"
        placeholder={name}
        onChange={onChange}
      />
      <span className="absolute left-20">
        <SearchICO />
      </span>
    </div>
  );
};

export default Search;
