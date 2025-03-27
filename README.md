# Twitter Crawler for Koii Network

## Project Overview

The Twitter Crawler is a specialized CLI tool designed for community-driven data archival and gathering tasks within the Koii Network. It enables users to programmatically search, collect, and archive Twitter content using decentralized task execution.

🔍 **Key Features:**
- Automated Twitter content retrieval
- Configurable search queries
- Support for recursive content exploration
- Koii Network task integration
- Headless browser automation

### Use Cases
- Public archival projects
- Social media trend analysis
- Content preservation
- Academic research
- Community monitoring

⚠️ **Ethical Notice:** This tool is intended for legitimate research and archival purposes only. Users must comply with Twitter's Terms of Service and respect individual privacy.

## Installation

### Prerequisites
- Node.js (v14+ recommended)
- Yarn package manager
- Chrome/Chromium browser

### Setup
```bash
# Clone the repository
git clone https://github.com/your-org/twitter-crawler.git
cd twitter-crawler

# Install dependencies
yarn install
```

## Usage

### Basic Search
```bash
# Search Twitter for a specific hashtag
node twitter-task.js --search "#koii" --limit 100
```

### Advanced Configuration
Configure your crawler in `twitter-task.js`:
```javascript
let query = {
    limit: 100,           // Maximum records to retrieve
    searchTerm: "#koii",  // Keyword/hashtag to search
    depth: 3,             // Recursive exploration depth
    recursive: true       // Enable recursive content gathering
}
```

### Running Tests
```bash
# Run a single crawling round test
yarn test
```

## Command Reference

| Command | Options | Description |
|---------|---------|-------------|
| `--search` | String | Specify search term/hashtag |
| `--limit` | Number | Maximum records to retrieve (default: 100) |
| `--depth` | Number | Recursive exploration depth (default: 3) |
| `--recursive` | Boolean | Enable/disable recursive gathering |

## Configuration

### Environment Variables
Copy `.env.sample` to `.env` and configure:
```
TWITTER_API_KEY=your_api_key
TWITTER_API_SECRET=your_api_secret
```

## Deployment to Koii Network

```bash
# Build task executable
yarn webpack

# Deploy to Koii Network
npx @_koii/create-task-cli@latest
```

## Project Structure
- `twitter-task.js`: Primary task implementation
- `adapters/`: Twitter-specific adapters
- `tests/`: Test suite for crawler functionality
- `config-task.yml`: Task configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push and submit a Pull Request

Please ensure your code passes all tests and follows project guidelines.

## Legal and Ethical Considerations

This tool is strictly for:
✅ Personal research
✅ Public archival projects
✅ Academic studies

❌ NOT for:
- Commercial data mining
- Privacy violation
- Unauthorized data collection

## License

ISC License. See `LICENSE` file for complete details.

## Resources

- [Koii Network Documentation](https://docs.koii.network)
- [Task Deployment Guide](https://blog.koii.network/How-to-deploy-a-koii-task-in-less-than-5mins/)