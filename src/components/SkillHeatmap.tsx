import { Card, Title, Text, Tooltip, Box } from '@mantine/core';
import type { CandidateWithEvaluation } from '../types';

interface SkillHeatmapProps {
    candidates: CandidateWithEvaluation[];
    onSelectCandidate: (candidate: CandidateWithEvaluation) => void;
}

function getHeatColor(score: number): string {
    // Green gradient based on score
    if (score >= 90) return '#2b8a3e';
    if (score >= 85) return '#37b24d';
    if (score >= 80) return '#51cf66';
    if (score >= 75) return '#8ce99a';
    if (score >= 70) return '#b2f2bb';
    if (score >= 65) return '#ffd43b';
    if (score >= 60) return '#fab005';
    return '#ff6b6b';
}

export function SkillHeatmap({ candidates, onSelectCandidate }: SkillHeatmapProps) {
    const metrics = ['crisisManagementScore', 'sustainabilityScore', 'teamMotivationScore'] as const;
    const metricLabels = {
        crisisManagementScore: 'Crisis',
        sustainabilityScore: 'Sustain',
        teamMotivationScore: 'Motiv'
    };

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={3} mb="md">📊 Score Heatmap</Title>

            {/* Header row */}
            <Box mb="xs" style={{ display: 'flex', gap: '4px', paddingLeft: '80px' }}>
                <Text size="xs" fw={500} w={40} ta="center">Crisis</Text>
                <Text size="xs" fw={500} w={40} ta="center">Sust.</Text>
                <Text size="xs" fw={500} w={40} ta="center">Motiv</Text>
            </Box>

            {/* Heatmap grid */}
            <Box style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {candidates.map((candidate) => (
                    <Box
                        key={candidate.id}
                        style={{
                            display: 'flex',
                            gap: '4px',
                            marginBottom: '2px',
                            cursor: 'pointer',
                            padding: '2px',
                            borderRadius: '4px'
                        }}
                        onClick={() => onSelectCandidate(candidate)}
                        className="heatmap-row"
                    >
                        <Tooltip label={candidate.name}>
                            <Text
                                size="xs"
                                w={80}
                                truncate
                                style={{ lineHeight: '24px' }}
                            >
                                {candidate.name.split(' ')[0]}
                            </Text>
                        </Tooltip>
                        {metrics.map((metric) => (
                            <Tooltip
                                key={metric}
                                label={`${metricLabels[metric]}: ${candidate.evaluation[metric].toFixed(1)}`}
                            >
                                <Box
                                    w={40}
                                    h={24}
                                    style={{
                                        backgroundColor: getHeatColor(candidate.evaluation[metric]),
                                        borderRadius: '3px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Text size="xs" c="white" fw={500}>
                                        {Math.round(candidate.evaluation[metric])}
                                    </Text>
                                </Box>
                            </Tooltip>
                        ))}
                    </Box>
                ))}
            </Box>

            {/* Legend */}
            <Box mt="md" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <Text size="xs" c="dimmed">Score Legend:</Text>
                {[
                    { color: '#2b8a3e', label: '90+' },
                    { color: '#51cf66', label: '80-89' },
                    { color: '#b2f2bb', label: '70-79' },
                    { color: '#ffd43b', label: '60-69' },
                    { color: '#ff6b6b', label: '<60' }
                ].map(({ color, label }) => (
                    <Box key={label} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Box w={12} h={12} style={{ backgroundColor: color, borderRadius: '2px' }} />
                        <Text size="xs">{label}</Text>
                    </Box>
                ))}
            </Box>
        </Card>
    );
}
