import {
  EXAMPLE_GOOD_TWEET,
  TWEET_ANALYSIS_PROMPT,
  TWEET_GENERATION_PROMPT,
} from "@/config/prompts";
import Anthropic from "@anthropic-ai/sdk";

export class ClaudeService {
  private readonly claude: Anthropic;
  private readonly model = "claude-3-haiku-20240307";

  constructor() {
    this.claude = new Anthropic({
      apiKey: Bun.env.ANTHROPIC_API_KEY!,
    });
  }

  async analyzeTweets(tweets: any[]) {
    const tweetContent = tweets.map((tweet) => tweet.text).join("\n\n");

    const prompt = TWEET_ANALYSIS_PROMPT.replace(
      "{{tweetContent}}",
      tweetContent
    );

    const message = await this.claude.messages.create({
      model: this.model,
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const textContent =
      message.content[0].type === "text"
        ? message.content[0].text
        : "Could not analyze content";

    return textContent;
  }

  async generateTweet(insights: string) {
    const prompt = TWEET_GENERATION_PROMPT.replace(
      "{{insights}}",
      insights
    ).replace("{{exampleTweet}}", EXAMPLE_GOOD_TWEET);

    const message = await this.claude.messages.create({
      model: this.model,
      max_tokens: 300,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const textContent =
      message.content[0].type === "text"
        ? message.content[0].text
        : "Could not generate tweet";

    return textContent;
  }
}
