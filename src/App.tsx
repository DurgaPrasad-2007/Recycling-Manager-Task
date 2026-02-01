import React, { useState, useMemo } from 'react';
import { MantineProvider, Container, Title, Text, Grid, Box, createTheme } from '@mantine/core';
import '@mantine/core/styles.css';
import { Leaderboard } from './components/Leaderboard';
import { SkillHeatmap } from './components/SkillHeatmap';
import { CandidateCard } from './components/CandidateCard';
import { FilterBar } from './components/FilterBar';
import candidatesData from './data/candidates.json';
import type { CandidateWithEvaluation } from './types';
import './styles.css';

// Cast imported JSON to proper type
const candidates = candidatesData as CandidateWithEvaluation[];

// Custom theme for sustainability focus
const theme = createTheme({
  primaryColor: 'teal',
  colors: {
    dark: [
      '#C1C2C5', '#A6A7AB', '#909296', '#5C5F66',
      '#373A40', '#2C2E33', '#25262B', '#1A1B1E',
      '#141517', '#101113'
    ],
  },
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  headings: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  },
});

function App() {
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateWithEvaluation | null>(null);
  const [modalOpened, setModalOpened] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rank');

  // Filter and sort candidates
  const filteredCandidates = useMemo(() => {
    let result = [...candidates];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(c =>
        c.name.toLowerCase().includes(term) ||
        c.skills.some(s => s.name.toLowerCase().includes(term)) ||
        c.certifications.some(cert => cert.toLowerCase().includes(term))
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'experience':
        result.sort((a, b) => b.yearsExperience - a.yearsExperience);
        break;
      case 'crisis':
        result.sort((a, b) => b.evaluation.crisisManagementScore - a.evaluation.crisisManagementScore);
        break;
      case 'sustainability':
        result.sort((a, b) => b.evaluation.sustainabilityScore - a.evaluation.sustainabilityScore);
        break;
      case 'motivation':
        result.sort((a, b) => b.evaluation.teamMotivationScore - a.evaluation.teamMotivationScore);
        break;
      default: // rank
        result.sort((a, b) => a.rank - b.rank);
    }

    return result;
  }, [searchTerm, sortBy]);

  const handleSelectCandidate = (candidate: CandidateWithEvaluation) => {
    setSelectedCandidate(candidate);
    setModalOpened(true);
  };

  const handleReset = () => {
    setSearchTerm('');
    setSortBy('rank');
  };

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Box className="app-container">
        {/* Header */}
        <Box className="header" py="xl" mb="lg">
          <Container size="xl">
            <Title order={1} className="header-title">
              ♻️ Recycling Production Line Manager
            </Title>
            <Text size="lg" c="dimmed" mt="xs">
              AI-Powered Candidate Selection System
            </Text>
            <Text size="sm" c="dimmed">
              {candidates.length} candidates evaluated • Last updated: {new Date().toLocaleDateString()}
            </Text>
          </Container>
        </Box>

        {/* Main Content */}
        <Container size="xl">
          <FilterBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            sortBy={sortBy}
            onSortChange={(val) => setSortBy(val || 'rank')}
            onReset={handleReset}
          />

          <Grid gutter="lg">
            {/* Leaderboard - Main focus */}
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Leaderboard
                candidates={filteredCandidates}
                onSelectCandidate={handleSelectCandidate}
              />
            </Grid.Col>

            {/* Heatmap - Side panel */}
            <Grid.Col span={{ base: 12, md: 4 }}>
              <SkillHeatmap
                candidates={filteredCandidates}
                onSelectCandidate={handleSelectCandidate}
              />
            </Grid.Col>
          </Grid>

          {/* Stats Footer */}
          <Box mt="xl" py="md" className="stats-footer">
            <Grid>
              <Grid.Col span={4}>
                <Text ta="center" size="sm" c="dimmed">
                  Average Crisis Score: <strong>{(candidates.reduce((sum, c) => sum + c.evaluation.crisisManagementScore, 0) / candidates.length).toFixed(1)}</strong>
                </Text>
              </Grid.Col>
              <Grid.Col span={4}>
                <Text ta="center" size="sm" c="dimmed">
                  Average Sustainability: <strong>{(candidates.reduce((sum, c) => sum + c.evaluation.sustainabilityScore, 0) / candidates.length).toFixed(1)}</strong>
                </Text>
              </Grid.Col>
              <Grid.Col span={4}>
                <Text ta="center" size="sm" c="dimmed">
                  Average Motivation: <strong>{(candidates.reduce((sum, c) => sum + c.evaluation.teamMotivationScore, 0) / candidates.length).toFixed(1)}</strong>
                </Text>
              </Grid.Col>
            </Grid>
          </Box>
        </Container>

        {/* Candidate Detail Modal */}
        <CandidateCard
          candidate={selectedCandidate}
          opened={modalOpened}
          onClose={() => setModalOpened(false)}
        />
      </Box>
    </MantineProvider>
  );
}

export default App;
