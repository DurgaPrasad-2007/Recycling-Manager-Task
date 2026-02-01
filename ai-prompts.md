# AI Evaluation Prompts for Recycling Production Line Manager Candidates

## Overview

These prompts are designed to evaluate candidates for a recycling production line manager role across three critical dimensions. Each prompt simulates a real-world scenario that tests the candidate's capabilities in that area.

**Scoring Scale**: 0-100 points
**Weights**: Crisis Management (35%), Sustainability (35%), Team Motivation (30%)

---

## Prompt 1: Crisis Management Evaluation

### Scenario

> You are the production line manager at a recycling facility. During peak processing hours (handling 50 tons of mixed recyclables), the main conveyor belt system suddenly fails. You have:
> - 8 sorting line workers waiting for instructions
> - 3 incoming trucks scheduled within the next 2 hours
> - A major client pickup scheduled for processed materials in 4 hours
> - The maintenance team estimates repairs will take 3-5 hours

**Question**: Describe your immediate actions in the first 30 minutes and your overall strategy to manage this crisis.

### Scoring Rubric

| Score Range | Criteria |
|-------------|----------|
| **90-100** | Demonstrates exceptional command. Immediately prioritizes safety, establishes clear communication chain, implements contingency plans, considers multiple stakeholders, and proposes creative workarounds (e.g., manual sorting stations, rerouting trucks). |
| **80-89** | Shows strong leadership with systematic approach. Addresses immediate safety, coordinates with maintenance, communicates with stakeholders, and has backup plans. May miss some optimization opportunities. |
| **70-79** | Adequate response covering basic crisis steps. Handles immediate concerns but may lack depth in stakeholder communication or creative problem-solving. |
| **60-69** | Basic understanding but reactive rather than proactive. Missing key elements like parallel processing of tasks or complete stakeholder analysis. |
| **Below 60** | Insufficient crisis management skills. Fails to prioritize, poor communication plan, or lacks systematic approach. |

---

## Prompt 2: Sustainability Knowledge Evaluation

### Scenario

> Your recycling facility has been asked to develop a proposal for processing a new waste stream: mixed electronic waste (e-waste) including smartphones, laptops, and small appliances. The facility currently handles only traditional recyclables.

**Question**: Outline your approach to evaluate this opportunity, including environmental considerations, regulatory requirements, and operational changes needed.

### Scoring Rubric

| Score Range | Criteria |
|-------------|----------|
| **90-100** | Comprehensive understanding of e-waste complexity. Addresses hazardous materials (lithium batteries, heavy metals), regulatory requirements (EPA, state regulations), certifications (R2, e-Stewards), circular economy principles, worker safety, and market analysis for recovered materials. |
| **80-89** | Strong knowledge of environmental and regulatory landscape. Covers most key areas with practical implementation steps. May miss some specialized aspects like certified downstream processors. |
| **70-79** | Good foundational understanding. Recognizes special handling requirements and basic regulations but may lack depth on certification standards or market dynamics. |
| **60-69** | Basic awareness of e-waste challenges. Understands it's different from traditional recycling but missing key regulatory or environmental details. |
| **Below 60** | Insufficient knowledge of sustainability principles. Fails to recognize unique challenges of e-waste or environmental regulations. |

---

## Prompt 3: Team Motivation Assessment

### Scenario

> You've just been promoted to manage a recycling facility team of 25 workers. The previous manager left abruptly, morale is low, and there's been a 20% increase in absenteeism over the past 3 months. Two veteran workers have indicated they're considering leaving. The facility needs to increase throughput by 15% to meet new contracts.

**Question**: Describe your 90-day plan to rebuild team morale while meeting the increased production targets.

### Scoring Rubric

| Score Range | Criteria |
|-------------|----------|
| **90-100** | Exceptional people leadership. Balances immediate morale interventions with sustainable culture building. Includes individual meetings with key team members, transparent communication, recognition programs, skill development opportunities, and metrics-based improvement with team buy-in. |
| **80-89** | Strong motivational approach with structured plan. Addresses both veteran retention and broader team engagement. Has specific milestones but may miss some nuances of change management. |
| **70-79** | Solid team management understanding. Proposes reasonable interventions but may over-rely on single approach (e.g., only incentives) without addressing root causes. |
| **60-69** | Basic awareness of team dynamics. Recognizes need for intervention but plan lacks specificity or timeline. May focus heavily on production at expense of morale or vice versa. |
| **Below 60** | Insufficient leadership capability. Fails to balance competing priorities, proposes unrealistic solutions, or shows poor understanding of team dynamics. |

---

## Implementation Notes

### Using These Prompts

1. **With AI APIs**: Send the scenario and question to Claude, GPT-4, or similar models with the candidate's response for analysis against the rubric.

2. **Mock Scoring**: For demonstration, scores are generated using a normal distribution (mean: 70, std: 15) with slight adjustments based on candidate experience level.

3. **Evaluation Process**:
   - Present scenario to candidate
   - Allow 5-10 minutes for written response
   - Submit response to AI for scoring
   - AI returns score (0-100) with justification

### Sample API Call (Claude)

```javascript
const evaluateResponse = async (scenario, candidateResponse) => {
  const prompt = `
    You are evaluating a candidate for a recycling production line manager role.
    
    SCENARIO: ${scenario}
    
    CANDIDATE RESPONSE: ${candidateResponse}
    
    SCORING RUBRIC: [Include rubric from above]
    
    Provide:
    1. A score from 0-100
    2. A brief justification (2-3 sentences)
    3. Key strengths noted
    4. Areas for improvement
    
    Format as JSON.
  `;
  
  // Call AI API with prompt
  return await callClaudeAPI(prompt);
};
```

---

## Weighting Rationale

| Dimension | Weight | Reasoning |
|-----------|--------|-----------|
| Crisis Management | 35% | Production environments require strong crisis handling. Equipment failures, safety incidents, and supply disruptions are common. |
| Sustainability | 35% | Core to mission of recycling facilities. Regulatory compliance and environmental stewardship are critical success factors. |
| Team Motivation | 30% | People management ensures consistent operation. Slightly lower weight as it can be developed, while crisis/sustainability knowledge is harder to train. |

---

## Total Score Calculation

```
Total Score = (Crisis × 0.35) + (Sustainability × 0.35) + (Motivation × 0.30)
```

This weighted approach ensures candidates are evaluated holistically while emphasizing the technical knowledge most critical for the role.
