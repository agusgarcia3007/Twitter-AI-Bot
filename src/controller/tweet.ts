import { ClaudeService } from "@/services/claude";
import { TwitterService } from "@/services/twitter";
import { Context } from "hono";

export async function createTweet(c: Context) {
  try {
    const twitterService = new TwitterService();
    const claudeService = new ClaudeService();

    const tweetsResponse = await twitterService.getRecentTweets(20);

    if (!tweetsResponse.data || tweetsResponse.data.length === 0) {
      console.log(
        "No recent tweets found. Unable to analyze and generate new content."
      );

      return c.json(
        {
          success: false,
          error: "No recent tweets found to analyze.",
        },
        400
      );
    }

    const insights = await claudeService.analyzeTweets(tweetsResponse.data);
    const newTweet = await claudeService.generateTweet(insights);

    await twitterService.postTweet(newTweet);

    return c.json({
      success: true,
      tweet: newTweet,
    });
  } catch (error) {
    console.error("Error in tweet generation process:", error);

    return c.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      500
    );
  }
}
