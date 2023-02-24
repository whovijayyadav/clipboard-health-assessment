# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

Ticket 1 : 
    # Spike: Analyze impact & document plan of action

    ## Goal
    - Design the schema change required for adding new field
    - Document tech-spec for changes for functions `getShiftsByFacility` & `generateReport`
    - Describe schema migration efforts
    - Describe rollout criteria
    - Describe test plan
    - Analyze rollback plan
    - Timeline Estimation

    ## Acceptance Criteria
    - Document describing the goals mentioned above
    - Get approval by going through the design review process

    ##Time Estimation
    - 2-3 days


Ticket 2 :
    # Schema update

    ## Updated Column Design

    Column Name: custom_agent_id
    Nullable: True
    Type: varchar(50)
    Constraint : Unique per facility id (each agent in a facility should have a unique custom id)

    Add index on column custom_agent_id


    ## Goal
    - Add code change for schema update
    - Get approval from db-migration team
    - Perform schema migration

    ## Acceptance Criteria
    - Field `custom_agent_id` is added to the table

    ## Time Estimation
    - 1-2 days

Ticket 3 :
    # Backfill column `custom_agent_id`

    ## Goal
    - Create a backfill job (could be a lambda or a cron job) that backfills the data in the db
    - Run backfill job for `custom_agent_id`

    ## Acceptance Criteria
    - Field `custom_agent_id` is populated with default values

    ## Time Estimation
    - 2-3 days

Ticket 4 :
    # Update `getShiftsByFacility` to use the new column

    ## Goal
    - Code change to update `getShiftsByFacility` to use new column
    - Unit tests to test the mocked version of database
    - E2E integration tests to verify validity of new schema

    ## Acceptance Criteria
    - `getShiftsByFacility` is updated to use new column

    ## Time Estimation
    - 1-2 days

Ticket 5 :
    # Update `generateReport` to use the new column

    ## Goal
    - Code change to update `generateReport` to use new column
    - Unit tests to test the mocked version of database
    - E2E integration tests to verify validity of new schema
    - Manual test by generating the PDF report

    ## Acceptance Criteria
    - `generateReport` is updated to use new column
    - Report consists of the `custom_agent_id` field
