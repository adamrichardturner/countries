import { SearchComponentProps } from '@/interfaces'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const SearchComponent: React.FC<SearchComponentProps> = ({
  searchTerm,
  onSearchTermChange
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchTermChange(event.target.value)
  }

  return (
    <div className="rounded-lg bg-white dark:bg-dark-blue w-full md:w-4/12 flex flex-row items-center py-3 focus-within:ring-1 focus-within:ring-offset-1 focus-within:ring-offset-light-blue focus-within:ring-white dark:focus-within:ring-black shadow-md">
      <FontAwesomeIcon
        icon={faSearch}
        className="text-gray-500 dark:text-white mx-5"
      />
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search for a country..."
        className="rounded-lg w-full h-full bg-transparent focus:outline-none dark:placeholder:text-white placeholder:text-sm"
      />
    </div>
  )
}

export default SearchComponent
