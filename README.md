# Task Node Deployment CLI

## Project Overview

This CLI tool is a comprehensive task node deployment and management utility designed for decentralized task execution environments. It provides a robust framework for initializing, configuring, and managing distributed computing tasks, with built-in support for web3 technologies and containerized deployments.

**Key Features:**
- Web3 task node initialization
- Docker container management
- Task state tracking
- Inter-process communication handling
- Automated payload submission and auditing

### Use Cases
- Decentralized computing task orchestration
- Web3 infrastructure management
- Distributed task node deployment
- Automated blockchain-related task execution

## Installation

### Prerequisites
- Node.js (v14+ recommended)
- Yarn package manager
- Docker
- Web3 wallet

### Install via NPM/Yarn
```bash
npm install -g js_app_deploy
# or
yarn global add js_app_deploy
```

### Docker Installation
```bash
docker pull 1703706/cryo:v1-slim
```

## Usage

### Basic Commands

1. Start Task Node
```bash
# Initialize and start the task node
yarn start
```

2. Deploy Task
```bash
# Webpack build and deploy
yarn whammy
```

3. Run Tests
```bash
# Execute test suite
yarn test
```

### Advanced Usage

#### Task Execution
```bash
# Execute specific task
node index.js --task=<taskId>

# Submit payload for a round
node index.js --submit-payload=<roundNumber>

# Audit distribution
node index.js --audit-distribution=<roundNumber>
```

## Command Reference

| Command | Description | Options |
|---------|-------------|---------|
| `start` | Initialize task node | - |
| `test` | Run test suite | - |
| `webpack` | Build project | `--mode production` |
| `deploy` | Deploy task | - |
| `whammy` | Build and deploy | - |

## Configuration

### Environment Variables
Create a `.env` file with the following optional configurations:

```ini
# Web3 Provider URL
WEB3_PROVIDER=https://mainnet.infura.io/v3/YOUR_PROJECT_ID

# Task Node Settings
TASK_NODE_ID=unique_node_identifier
ROUND_TIMEOUT=30000
```

## Project Structure
- `index.js`: Main entry point
- `coreLogic.js`: Core task logic
- `init.js`: Initialization utilities
- `routes.js`: API route definitions
- `tests/`: Test suite
- `adapters/`: Protocol-specific adapters

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

### Running Tests
```bash
yarn test
```

## License

This project is licensed under the ISC License. See the LICENSE file for details.

## Support

For issues or questions, please file a GitHub issue in the repository.