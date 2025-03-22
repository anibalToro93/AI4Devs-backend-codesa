# Prompts ATB

This file contains prompts related to ATB functionality.

## Overview

Add your prompts and documentation here.

## Prompts

### Example Prompt

```markdown
Your prompt content here
```

### Get Position Candidates Endpoint

```markdown
Create a GET endpoint at /positions/:id/candidates that retrieves all candidates in process for a specific position.

Requirements:
- HTTP Method: GET
- Path: /positions/:id/candidates
- Purpose: Get all candidates in process for a specific position (all applications for a given positionID)

Response Data Structure:
{
  "candidates": [
    {
      "fullName": "string",           // From candidate table
      "currentInterviewStep": "string", // From application table
      "averageScore": number          // Calculated from interview scores
    }
  ]
}

Database Tables Involved:
- candidate: Contains candidate information
- application: Contains application status and interview step
- interview: Contains interview scores

Business Logic:
1. Find all applications for the given position ID
2. For each application:
   - Get candidate details from candidate table
   - Get current interview step from application table
   - Calculate average score from all interviews for this application
3. Return the combined information in the specified format
```

### Update Candidate Stage Endpoint

```markdown
Create a PUT endpoint at /candidates/:id/stage to update a candidate's interview stage.

Requirements:
- HTTP Method: PUT
- Path: /candidates/:id/stage
- Purpose: Update the current interview stage for a specific candidate

Request Body:
{
  "stage": "string"  // New interview stage for the candidate
}

Response:
- 200 OK: Stage updated successfully
- 400 Bad Request: Invalid stage or candidate ID
- 404 Not Found: Candidate not found

Database Tables Involved:
- application: Contains the current interview stage

Business Logic:
1. Validate the candidate exists
2. Validate the new stage is valid
3. Update the currentInterviewStep in the application table
4. Return success response
```

## Notes

Add any additional notes or documentation as needed. 