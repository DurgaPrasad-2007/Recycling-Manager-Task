import { Table, Badge, Avatar, Group, Text, Progress, Card, Title, Box } from '@mantine/core';
import type { CandidateWithEvaluation } from '../types';

interface LeaderboardProps {
    candidates: CandidateWithEvaluation[];
    onSelectCandidate: (candidate: CandidateWithEvaluation) => void;
}

function getScoreColor(score: number): string {
    if (score >= 85) return 'green';
    if (score >= 75) return 'teal';
    if (score >= 65) return 'yellow';
    return 'orange';
}

function getRankBadge(rank: number): React.ReactNode {
    if (rank === 1) return <Badge color="yellow" variant="filled" size="lg">🥇 1st</Badge>;
    if (rank === 2) return <Badge color="gray" variant="filled" size="lg">🥈 2nd</Badge>;
    if (rank === 3) return <Badge color="orange" variant="filled" size="lg">🥉 3rd</Badge>;
    return <Badge variant="outline" size="md">#{rank}</Badge>;
}

export function Leaderboard({ candidates, onSelectCandidate }: LeaderboardProps) {
    const topCandidates = candidates.slice(0, 10);

    const rows = topCandidates.map((candidate) => (
        <Table.Tr
            key={candidate.id}
            style={{ cursor: 'pointer' }}
            onClick={() => onSelectCandidate(candidate)}
        >
            <Table.Td>
                {getRankBadge(candidate.rank)}
            </Table.Td>
            <Table.Td>
                <Group gap="sm">
                    <Avatar
                        color="teal"
                        radius="xl"
                        size="md"
                    >
                        {candidate.name.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    <div>
                        <Text size="sm" fw={500}>{candidate.name}</Text>
                        <Text size="xs" c="dimmed">{candidate.yearsExperience} years exp.</Text>
                    </div>
                </Group>
            </Table.Td>
            <Table.Td>
                <Badge color="blue" variant="light">{candidate.educationLevel}</Badge>
            </Table.Td>
            <Table.Td>
                <Box w={100}>
                    <Progress
                        value={candidate.evaluation.crisisManagementScore}
                        color={getScoreColor(candidate.evaluation.crisisManagementScore)}
                        size="sm"
                    />
                    <Text size="xs" ta="center">{candidate.evaluation.crisisManagementScore.toFixed(1)}</Text>
                </Box>
            </Table.Td>
            <Table.Td>
                <Box w={100}>
                    <Progress
                        value={candidate.evaluation.sustainabilityScore}
                        color={getScoreColor(candidate.evaluation.sustainabilityScore)}
                        size="sm"
                    />
                    <Text size="xs" ta="center">{candidate.evaluation.sustainabilityScore.toFixed(1)}</Text>
                </Box>
            </Table.Td>
            <Table.Td>
                <Box w={100}>
                    <Progress
                        value={candidate.evaluation.teamMotivationScore}
                        color={getScoreColor(candidate.evaluation.teamMotivationScore)}
                        size="sm"
                    />
                    <Text size="xs" ta="center">{candidate.evaluation.teamMotivationScore.toFixed(1)}</Text>
                </Box>
            </Table.Td>
            <Table.Td>
                <Text fw={700} c={getScoreColor(candidate.totalScore)}>
                    {candidate.totalScore.toFixed(1)}
                </Text>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={3} mb="md">🏆 Top 10 Candidates</Title>
            <Table.ScrollContainer minWidth={800}>
                <Table striped highlightOnHover>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Rank</Table.Th>
                            <Table.Th>Candidate</Table.Th>
                            <Table.Th>Education</Table.Th>
                            <Table.Th>Crisis Mgmt</Table.Th>
                            <Table.Th>Sustainability</Table.Th>
                            <Table.Th>Motivation</Table.Th>
                            <Table.Th>Total</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </Card>
    );
}
