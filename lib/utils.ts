// Parse vouch messages to extract currency amounts
export function extractCurrencyData(vouches: Array<{ message: string }>) {
  const stats = {
    totalINR: 0,
    nitro: 0,
    decors: 0,
    owo: 0,
    crypto: 0,
    ltcGiveaways: 0,
  };

  vouches.forEach((vouch) => {
    const message = vouch.message.toLowerCase();

    // Extract INR amounts (e.g., "120 inr", "got 120inr", "legit got 120 inr")
    const inrMatch = message.match(/(\d+)\s*inr/i);
    if (inrMatch) {
      stats.totalINR += parseInt(inrMatch[1], 10);
    }

    // Count Nitro mentions
    if (message.includes('nitro')) {
      stats.nitro += 1;
    }

    // Count Decor mentions
    if (message.includes('decor')) {
      stats.decors += 1;
    }

    // Extract OWO amounts (e.g., "1.5m owo", "100k owo", "500 owo")
    const owoMatch = message.match(/([\d.]+)\s*([km])?\s*owo/i);
    if (owoMatch) {
      let amount = parseFloat(owoMatch[1]);
      const multiplier = owoMatch[2]?.toLowerCase();
      
      if (multiplier === 'm') {
        amount *= 1000000;
      } else if (multiplier === 'k') {
        amount *= 1000;
      }
      
      stats.owo += Math.floor(amount);
    }

    // Count LTC Giveaways (mentions of ltc or litecoin)
    if (message.includes('ltc') || message.includes('litecoin')) {
      stats.ltcGiveaways += 1;
    }

    // Extract Crypto amounts in USD (e.g., "0.10$ ltc", "$5 btc", "got 20$ crypto")
    const cryptoMatch = message.match(/(?:\$|usd)?\s*(\d+\.?\d*)\s*(?:\$|usd)?\s*(?:ltc|btc|bitcoin|eth|ethereum|crypto|usdt|doge|dogecoin|litecoin)/i);
    if (cryptoMatch) {
      const amount = parseFloat(cryptoMatch[1]);
      if (!isNaN(amount)) {
        stats.crypto += amount;
      }
    }
  });

  return stats;
}

// User mapping for Discord mentions
const userMapping: Record<string, { name: string; id: string }> = {
  '@imunknown69': { name: 'Unknown', id: '959653911923396629' },
  'imunknown69': { name: 'Unknown', id: '959653911923396629' },
  '@rex.f': { name: 'Rex', id: '643480211421265930' },
  'rex.f': { name: 'Rex', id: '643480211421265930' },
  '@alexx': { name: 'Alexx', id: '283127777383809024' },
  'alexx': { name: 'Alexx', id: '283127777383809024' },
};

// Map user IDs to display names
const userIdMapping: Record<string, string> = {
  '959653911923396629': 'Unknown',
  '643480211421265930': 'Rex',
  '283127777383809024': 'Alexx',
};

// Parse message and replace user mentions with clickable tags
export function parseMessageWithMentions(message: string) {
  const parts: Array<{ type: 'text' | 'mention'; content: string; userId?: string; displayName?: string }> = [];
  
  // Regex to match Discord user ID format: <@USER_ID>
  const mentionRegex = /<@(\d+)>/g;
  let lastIndex = 0;
  let match;

  while ((match = mentionRegex.exec(message)) !== null) {
    const userId = match[1];
    const displayName = userIdMapping[userId] || 'User';
    
    // Add text before the mention
    if (match.index > lastIndex) {
      const textBefore = message.slice(lastIndex, match.index);
      if (textBefore) {
        parts.push({ type: 'text', content: textBefore });
      }
    }
    
    // Add the mention
    parts.push({
      type: 'mention',
      content: `@${displayName}`,
      userId: userId,
      displayName: displayName,
    });
    
    lastIndex = match.index + match[0].length;
  }
  
  // Add remaining text after last mention
  if (lastIndex < message.length) {
    const remainingText = message.slice(lastIndex);
    if (remainingText) {
      parts.push({ type: 'text', content: remainingText });
    }
  }
  
  // If no mentions were found, return the entire message as text
  if (parts.length === 0) {
    parts.push({ type: 'text', content: message });
  }

  return parts;
}

export function getDiscordMessageUrl(messageId: string, guildId: string = '1306533976809185323', channelId: string = '1306534181093675052') {
  return `https://discord.com/channels/${guildId}/${channelId}/${messageId}`;
}

export function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
