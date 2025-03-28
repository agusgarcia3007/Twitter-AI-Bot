import { TwitterApi, TwitterApiReadOnly, UserV2 } from "twitter-api-v2";

export class TwitterService {
  private readonly twitterClient: TwitterApi;
  private readonly readOnlyClient: TwitterApiReadOnly;
  private readonly user = "agus_build";

  constructor() {
    this.twitterClient = new TwitterApi({
      appKey: Bun.env.TWITTER_API_KEY!,
      appSecret: Bun.env.TWITTER_API_SECRET!,
      accessToken: Bun.env.TWITTER_ACCESS_TOKEN!,
      accessSecret: Bun.env.TWITTER_ACCESS_SECRET!,
    });
    this.readOnlyClient = this.twitterClient.readOnly;
  }

  async getUser(): Promise<UserV2> {
    const userResponse = await this.readOnlyClient.v2.userByUsername(this.user);
    return userResponse.data;
  }

  async getRecentTweets(count: number = 2) {
    const user = await this.getUser();
    const tweets = await this.readOnlyClient.v2.userTimeline(user.id, {
      max_results: count,
      "tweet.fields": ["created_at", "public_metrics", "text"],
    });
    return tweets.data;
  }

  async postTweet(text: string) {
    try {
      const response = await this.twitterClient.v2.tweet(text);
      return response.data;
    } catch (error) {
      console.error("Error posting tweet:", error);
      throw error;
    }
  }
}
