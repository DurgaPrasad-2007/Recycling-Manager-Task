import {
    Modal,
    Text,
    Badge,
    Group,
    Stack,
    Avatar,
    Progress,
    Divider,
    Title,
    Button,
    CopyButton,
    Tooltip,
    Box,
    Paper
} from '@mantine/core';
import type { CandidateWithEvaluation } from '../types';

interface CandidateCardProps {
    candidate: CandidateWithEvaluation | null;
    opened: boolean;
    onClose: () => void;
}

function ScoreBar({ label, score, weight }: { label: string; score: number; weight: string }) {
    const getColor = (s: number) => {
        if (s >= 85) return 'green';
        if (s >= 75) return 'teal';
        if (s >= 65) return 'yellow';
        return 'orange';
    };

    return (
        <Box>
            <Group justify="space-between" mb={4}>
                <Text size="sm">{label}</Text>
                <Group gap="xs">
                    <Badge size="xs" variant="light">{weight}</Badge>
                    <Text size="sm" fw={600}>{score.toFixed(1)}</Text>
                </Group>
            </Group>
            <Progress value={score} color={getColor(score)} size="md" radius="md" />
        </Box>
    );
}

export function CandidateCard({ candidate, opened, onClose }: CandidateCardProps) {
    if (!candidate) return null;

    const shareText = `Check out ${candidate.name} - Recycling Manager Candidate
Score: ${candidate.totalScore.toFixed(1)}/100 (Rank #${candidate.rank})
Experience: ${candidate.yearsExperience} years
Education: ${candidate.educationLevel}

Key Scores:
- Crisis Management: ${candidate.evaluation.crisisManagementScore.toFixed(1)}
- Sustainability: ${candidate.evaluation.sustainabilityScore.toFixed(1)}
- Team Motivation: ${candidate.evaluation.teamMotivationScore.toFixed(1)}`;

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={null}
            size="lg"
            radius="md"
        >
            {/* Header */}
            <Group mb="lg">
                <Avatar color="teal" size="xl" radius="xl">
                    {candidate.name.split(' ').map(n => n[0]).join('')}
                </Avatar>
                <div style={{ flex: 1 }}>
                    <Group justify="space-between">
                        <Title order={3}>{candidate.name}</Title>
                        <Badge
                            size="lg"
                            variant="gradient"
                            gradient={{ from: 'teal', to: 'green' }}
                        >
                            Rank #{candidate.rank}
                        </Badge>
                    </Group>
                    <Text c="dimmed">{candidate.email}</Text>
                    <Text c="dimmed" size="sm">{candidate.phone}</Text>
                </div>
            </Group>

            <Divider mb="md" />

            {/* Quick Stats */}
            <Group mb="md" grow>
                <Paper p="sm" withBorder radius="md" style={{ textAlign: 'center' }}>
                    <Text size="xl" fw={700} c="teal">{candidate.yearsExperience}</Text>
                    <Text size="xs" c="dimmed">Years Exp.</Text>
                </Paper>
                <Paper p="sm" withBorder radius="md" style={{ textAlign: 'center' }}>
                    <Text size="xl" fw={700} c="blue">{candidate.totalScore.toFixed(1)}</Text>
                    <Text size="xs" c="dimmed">Total Score</Text>
                </Paper>
                <Paper p="sm" withBorder radius="md" style={{ textAlign: 'center' }}>
                    <Text size="xl" fw={700} c="violet">{candidate.certifications.length}</Text>
                    <Text size="xs" c="dimmed">Certifications</Text>
                </Paper>
            </Group>

            {/* Education */}
            <Group mb="md">
                <Text size="sm" fw={500}>Education:</Text>
                <Badge color="blue" variant="light" size="lg">{candidate.educationLevel}</Badge>
            </Group>

            {/* Summary */}
            <Text size="sm" c="dimmed" mb="md" style={{ fontStyle: 'italic' }}>
                "{candidate.summary}"
            </Text>

            <Divider my="md" label="AI Evaluation Scores" labelPosition="center" />

            {/* Scores */}
            <Stack gap="md" mb="lg">
                <ScoreBar
                    label="Crisis Management"
                    score={candidate.evaluation.crisisManagementScore}
                    weight="35%"
                />
                <ScoreBar
                    label="Sustainability Knowledge"
                    score={candidate.evaluation.sustainabilityScore}
                    weight="35%"
                />
                <ScoreBar
                    label="Team Motivation"
                    score={candidate.evaluation.teamMotivationScore}
                    weight="30%"
                />
            </Stack>

            <Divider my="md" label="Skills & Certifications" labelPosition="center" />

            {/* Skills */}
            <Text size="sm" fw={500} mb="xs">Skills:</Text>
            <Group gap="xs" mb="md">
                {candidate.skills.map((skill) => (
                    <Tooltip key={skill.name} label={`Proficiency: ${skill.proficiency}/5`}>
                        <Badge
                            variant="dot"
                            color={skill.proficiency >= 4 ? 'green' : skill.proficiency >= 3 ? 'yellow' : 'gray'}
                        >
                            {skill.name}
                        </Badge>
                    </Tooltip>
                ))}
            </Group>

            {/* Certifications */}
            <Text size="sm" fw={500} mb="xs">Certifications:</Text>
            <Group gap="xs" mb="lg">
                {candidate.certifications.map((cert) => (
                    <Badge key={cert} variant="outline" color="teal">
                        {cert}
                    </Badge>
                ))}
            </Group>

            {/* Share Button */}
            <Divider my="md" />
            <Group justify="center">
                <CopyButton value={shareText}>
                    {({ copied, copy }) => (
                        <Button
                            color={copied ? 'teal' : 'blue'}
                            onClick={copy}
                            leftSection={copied ? '✓' : '📋'}
                        >
                            {copied ? 'Copied!' : 'Share Candidate Profile'}
                        </Button>
                    )}
                </CopyButton>
            </Group>
        </Modal>
    );
}
