export const TWEET_ANALYSIS_PROMPT = `Analyze these recent tweets and provide insights on:
1. Main topics
2. Overall tone
3. Engagement patterns (what generates more interaction)

Tweets to analyze:
{{tweetContent}}

Provide a structured response with these insights.`;

export const TWEET_GENERATION_PROMPT = `Based on these insights about my recent Twitter activity:

{{insights}}

Generate a new, interesting, and original tweet that:
1. Is consistent with my style and topics
2. Is appealing to my audience
3. Has the potential to generate engagement
4. Is concise and direct (maximum 280 characters)
5. Does NOT include any hashtags
6. Is not a reply to any of the tweets above
7. Is not a retweet of any of the tweets above
8. Is not a quote of any of the tweets above
9. Preferably is maximum 80 characters
10. Don't mention anything that  I've not mentioned in tweets or replies. and ONLY mention things related to web development, AI, etc.
11. Don't mention anything about my personal life.
12. Don't mention anything about my family.
13. Don't mention anything about my friends.
14. Don't mention anything about my pets.
15. Don't mention anything about my hobbies.
16. Don't mention anything about my interests.
17. Don't mention anything about my goals.
18. Don't mention anything about my dreams.
19. Dont't mention anything that I've not talked about in the tweets or replies above.


Here's an example of a good tweet for reference:
{{exampleTweet}}

Provide ONLY the tweet text, without additional explanations. and without quotation marks.`;

export const EXAMPLE_GOOD_TWEET = `Just finished optimizing our app's performance - reduced loading time by 45%! The key was implementing proper lazy loading and optimizing database queries. Small changes, big impact.`;
