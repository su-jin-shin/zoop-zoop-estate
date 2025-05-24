
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Command, CommandList, CommandItem } from "@/components/ui/command";
import { locations } from "../utils/messageUtils";

type LocationSearchInputProps = {
  input: string;
  setInput: (value: string) => void;
  handleLocationSelect: (location: string) => void;
};

const LocationSearchInput = ({ input, setInput, handleLocationSelect }: LocationSearchInputProps) => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Search for locations as user types
  useEffect(() => {
    if (isSearching && input) {
      const results = locations.filter(location => 
        location.toLowerCase().includes(input.toLowerCase())
      );
      setSearchResults(results);
    } else if (isSearching) {
      // When input is empty, show all locations
      setSearchResults(locations);
    }
  }, [input, isSearching]);

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <Input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setIsSearching(true);
          }}
          onFocus={() => setIsSearching(true)}
          placeholder="지역명을 검색해주세요..."
          className="pl-10"
        />
      </div>
      
      <div className="bg-white border rounded-md shadow-lg overflow-hidden z-10">
        <ScrollArea className="h-[180px]">
          <Command>
            <CommandList className="min-h-[180px]">
              {(isSearching && searchResults.length > 0) ? (
                searchResults.map((location) => (
                  <CommandItem
                    key={location}
                    onSelect={() => handleLocationSelect(location)}
                    className="cursor-pointer p-2 hover:bg-slate-100"
                  >
                    {location}
                  </CommandItem>
                ))
              ) : (
                <div className="p-2 text-center text-gray-500">검색 결과가 없습니다</div>
              )}
            </CommandList>
          </Command>
        </ScrollArea>
      </div>
    </div>
  );
};

export default LocationSearchInput;
