import { FC } from 'react'
import { FilterComponentProps } from '@/interfaces'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

const FilterComponent: FC<FilterComponentProps> = ({
  selectedRegion,
  onRegionChange
}) => {
  const handleRegionChange = (region: string) => {
    // Check if the selected region is 'Filter by Region' and set it to 'All'
    if (region === 'Filter by Region') {
      region = ''
    }
    onRegionChange(region)
  }

  return (
    <div className="rounded-lg relative bg-white dark:bg-dark-blue flex flex-row border shadow-md border-none w-60">
      <Select value={selectedRegion} onValueChange={handleRegionChange}>
        <SelectTrigger className="w-[280px] h-12 bg-white dark:bg-dark-blue">
          <SelectValue placeholder="Filter by Region" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-dark-blue">
          <SelectGroup className="bg-white dark:bg-dark-blue">
            <SelectItem className="bg-white dark:bg-dark-blue" value="All">
              Filter by Region
            </SelectItem>
            {regions.map((region) => (
              <SelectItem
                key={region}
                value={region}
                onSelect={() => handleRegionChange(region)}
                className="cursor-pointer"
              >
                {region}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default FilterComponent
