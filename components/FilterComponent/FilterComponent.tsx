import { FC } from 'react'
import { FilterComponentProps } from '@/interfaces'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

const FilterComponent: FC<FilterComponentProps> = ({
  selectedRegion,
  onRegionChange
}) => {
  return (
    <div className="rounded-lg relative bg-white dark:bg-dark-blue flex flex-row border shadow-md border-none w-60">
      <select
        value={selectedRegion}
        onChange={(e) => onRegionChange(e.target.value)}
        className="rounded-lg w-full px-4 py-3 bg-white dark:bg-dark-blue focus:dark:bg-dark-blue leading-tight appearance-none focus:ring-0 focus:border-none border-none"
      >
        <option value="" className="bg-white">
          Filter by Region
        </option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
      <FontAwesomeIcon
        icon={faAngleDown}
        className="pointer-events-none absolute inset-y-3 right-0 flex items-center px-2 text-gray-500 dark:text-white"
        // Adjust the position of the icon to be inside the select element
      />
    </div>
  )
}

export default FilterComponent
