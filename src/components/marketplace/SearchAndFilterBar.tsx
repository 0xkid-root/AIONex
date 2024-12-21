import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface SearchAndFilterBarProps {
  onSearch: (query: string) => void;
  onFilter: (filters: any) => void;
}

export function SearchAndFilterBar({ onSearch, onFilter }: SearchAndFilterBarProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input
          type="text"
          placeholder="Search models..."
          onChange={(e) => onSearch(e.target.value)}
          className="flex-1"
        />
        <Button variant="secondary">Filters</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Price Range</label>
          <Slider
            defaultValue={[0, 1000]}
            max={1000}
            step={10}
            onValueChange={(value) => onFilter({ priceRange: value })}
          />
        </div>
        {/* Add more filters as needed */}
      </div>
    </div>
  );
} 