import { TextInput, Select, Group, Box, Button } from '@mantine/core';

interface FilterBarProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    sortBy: string;
    onSortChange: (value: string | null) => void;
    onReset: () => void;
}

export function FilterBar({
    searchTerm,
    onSearchChange,
    sortBy,
    onSortChange,
    onReset
}: FilterBarProps) {
    return (
        <Box mb="lg">
            <Group>
                <TextInput
                    placeholder="Search candidates..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    style={{ flex: 1 }}
                    leftSection="🔍"
                />
                <Select
                    placeholder="Sort by"
                    value={sortBy}
                    onChange={onSortChange}
                    data={[
                        { value: 'rank', label: 'Rank (Best First)' },
                        { value: 'name', label: 'Name (A-Z)' },
                        { value: 'experience', label: 'Experience (Most)' },
                        { value: 'crisis', label: 'Crisis Management' },
                        { value: 'sustainability', label: 'Sustainability' },
                        { value: 'motivation', label: 'Team Motivation' }
                    ]}
                    w={200}
                />
                <Button variant="subtle" onClick={onReset}>
                    Reset
                </Button>
            </Group>
        </Box>
    );
}
