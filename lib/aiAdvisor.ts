export interface AIResponse {
  advice: string;
  sentiment?: {
    sentiment_score: number;
    risk_rating: number;
  };
  riskAnalysis: {
    overallRisk: string;
    factors: string[];
    suggestions: string[];
  };
  suggestedActions: { action: string }[];
}

export const askAIAdvisor = async ({ query }: { query: string }): Promise<AIResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        advice: `Based on "${query}", consider monitoring BTC closely.`,
        sentiment: { sentiment_score: 72, risk_rating: 35 },
        riskAnalysis: {
          overallRisk: "Moderate",
          factors: ["Volatility", "Liquidity", "Market sentiment"],
          suggestions: ["Use stop-loss", "Diversify", "Wait for confirmation"]
        },
        suggestedActions: [{ action: "Set Alert at $72k" }, { action: "Buy on Dip" }]
      });
    }, 1200);
  });
};
