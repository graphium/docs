# Channels

An AI assistant that lives only inside Graphium has a limitation: people have to go to it. They have to open the app, navigate to the vault, find the assistant, and type their question. That works when you're already in the platform doing configuration or reviewing data. It doesn't work when a provider is between cases and wants to check tomorrow's schedule, or when a finance lead wants a quick number without context-switching out of Slack.

Channels solve this by deploying AI assistants as bots on the communication platforms your team already uses. The assistant goes to them.

---

## Where Channels Are Configured

Channels are set up in the **Channels tab** within an AI assistant's configuration, alongside the General, Tools, and Actions tabs.

When you first visit the Channels tab on a new assistant, you'll see a "No channels configured" state with the available platforms listed in the **Add Channel** section. Select a platform, configure the connection, and the assistant appears as a bot on that platform -- ready to receive messages and respond with the same data access and intelligence it has inside Graphium.

Each channel creates an individual bot profile. Users on the external platform message the bot directly, and the assistant handles the conversation just as it would in the vault's chat interface.

---

## Supported Platforms

### Microsoft Teams

Deploy the assistant as a Teams bot that users can message in a Teams chat. Team members find the bot in their Teams contacts and send it questions directly -- "What's the case volume at Memorial Hospital this week?" -- and receive responses inline in the Teams conversation. This is particularly useful for organizations that have standardized on Microsoft 365, where Teams is already open all day.

### Slack

Add the assistant to Slack channels or allow team members to DM it directly. The Slack channel deployment is especially powerful when paired with autonomous actions: a weekly summary or nightly alert posted to a shared channel reaches everyone who needs it without anyone subscribing to a report or checking a dashboard. For direct questions, team members message the assistant bot and get answers in their Slack workflow.

### SMS / Text Message

Reach the assistant via Twilio-powered text messaging. This is the channel for mobile-first users and time-sensitive situations. A provider between cases doesn't want to open a laptop -- they want to text a question and get an answer on their phone. An on-call administrator who needs a quick status check at 6 AM can text the assistant and get a response in seconds.

SMS channels are also valuable for people who aren't regular Graphium users. A surgeon who never logs into the platform but wants to know their schedule for tomorrow can simply send a text.

---

## How Channels Change the Workflow

The key idea is this: the assistant is the same regardless of where you reach it. A Data Analyst deployed on Slack has the same table access, the same connection actions, the same system prompt, and the same intelligence as it does inside the Graphium chat interface. The channel is just the front door.

This means your team doesn't need to learn a new tool or change their habits. The people who live in Slack ask questions in Slack. The people who live in Teams ask questions in Teams. The providers who are on their feet all day text from their phones. Everyone gets the same quality of response because they're all talking to the same assistant.

It also means that autonomous actions can deliver their output wherever your team actually looks. The nightly performance report doesn't sit in a dashboard waiting to be discovered -- it lands in the Slack channel your quality team checks every morning. The weekly financial summary doesn't require a login -- it shows up in the Teams chat the CFO already has open.

---

## Putting It Together

A scheduling coordinator deploys the Operations Helper assistant to the SMS channel via Twilio. A CRNA driving to the facility the next morning texts the assistant: "What's my schedule tomorrow?" The assistant checks the scheduling data in the vault and responds with the day's case list -- facility, times, surgeon pairings -- all via text message. No login, no laptop, no waiting until arrival to check the board.

Meanwhile, the finance team has the same vault's Data Analyst assistant connected to their #finance Slack channel. Every Monday at 8 AM, the assistant's autonomous action posts the weekly revenue summary directly into the channel. The team discusses it in the thread, right there in Slack, without ever opening Graphium. When someone has a follow-up question -- "What was the breakdown by facility?" -- they DM the assistant bot and get the answer in seconds.

Same assistants, same data, same intelligence. Different doors in.
