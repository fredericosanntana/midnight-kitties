# Midnight Kitties - AI Project Context (Browser-Only Version)

> **Quick Reference Guide for # Quick Start Commands

```bash
# Install dependencies
yarn install

# Build everything
yarn build

# Start web application development server
yarn workspace @repo/web-app dev

# Start production web app
yarn workspace @repo/web-app start

# Test contract
yarn workspace @midnight-ntwrk/kitties-contract test

## 🎯 Project Summary

**Midnight Kitties** is a browser-based CryptoKitties-inspired NFT dApp showcasing the **Midnight blockchain ecosystem** and **Compact programming language**. It serves as both a functional web application and educational reference for Midnight development.

### Key Features
- 🐱 **NFT System**: Breeding, trading, ownership mechanics
- 🧬 **Genetic Breeding**: DNA inheritance with generation tracking
- 💰 **Marketplace**: Offer/approval system for trading
- 🌐 **Browser-Only**: Optimized for web environments only
- 🔧 **Development Tools**: Testing and comprehensive docs

## 🏗️ Architecture Overview

```
             ┌─────────────────────┐
             │    Web Frontend     │
             │   (React + MUI)     │
             └─────────────────────┘
                        │
             ┌─────────────────────┐    ┌─────────────────────┐
             │   Browser API       │◄──►│   Smart Contract    │
             │  (Browser-only)     │    │ (Compact Language)  │
             └─────────────────────┘    └─────────────────────┘
                       │                          │
                       ▼                          ▼
          ┌────────────────────────────────────────────────────┐
          │            Midnight Network                        │
          │  (Privacy-first blockchain with ZK proofs)        │
          └────────────────────────────────────────────────────┘
```

## 📁 Critical File Locations

### Smart Contract
- **Main Contract**: `packages/contracts/kitties/src/kitties.compact`
- **Generated Code**: `packages/contracts/kitties/src/managed/`
- **Tests**: `packages/contracts/kitties/src/test/`

### API Layer
- **Browser-Only API**: `packages/api/kitties/src/`
- **Browser Entry**: `packages/api/kitties/src/browser-index.ts`
- **Browser Implementation**: `packages/api/kitties/src/browser/`
- **Common Code**: `packages/api/kitties/src/common/`

### Frontend
- **Web App**: `apps/web/src/`
- **UI Components**: `packages/ui/components/`
- **Main Entry**: `apps/web/src/main.tsx`

### Configuration
- **Root Config**: `package.json`, `turbo.json`, `tsconfig.json`
- **Vite Config**: `apps/web/vite.config.ts`

## 🔍 Key Technologies & Concepts

### Compact Language Features Used
```compact
// External module integration
import "midnight-contracts/contracts/tokens/nft/src/modules/Nft";

// Complex data structures
export struct Kitty {
  dna: Field,                // 32-byte genetic identifier
  gender: Gender,            // Male/Female enum
  owner: ZswapCoinPublicKey, // Owner's public key
  price: Uint<64>,           // Sale price
  forSale: Boolean,          // Sale status
  generation: Uint<32>       // Breeding generation
}

// Advanced state management
export ledger kitties: Map<Uint<64>, Kitty>;
export ledger buyOffers: Map<Uint<64>, Map<ZswapCoinPublicKey, Offer>>;
```

### Core Operations
1. **Kitty Management**: `createKitty()`, `transferKitty()`, `setPrice()`
2. **Marketplace**: `createBuyOffer()`, `approveOffer()`, `getOffer()`
3. **Breeding**: `breedKitty()` with DNA combination
4. **NFT Standard**: All ERC-721 operations via external module

### API Architecture Patterns
- **Browser-Only Environment**: Optimized for web browser constraints
- **Environment Detection**: Browser-only implementations with safe fallbacks
- **Package Exports**: Browser-specific entry points only
- **Unified Interface**: Consistent API surface for browser usage

## ⚡ Quick Start Commands

```bash
# Install dependencies
yarn install

# Build everything
yarn build

# Start web application development server
yarn workspace @repo/web-app dev

# Start production web app
yarn workspace @repo/web-app start

# Test contract
yarn workspace @midnight-ntwrk/kitties-contract test
```

## 🧪 Testing Strategy

### Contract Testing
- **Simulator**: `KittiesSimulator` class for isolated testing
- **Test File**: `packages/contracts/kitties/src/test/kitties.test.ts`
- **Coverage**: Basic ops, marketplace, breeding, NFT standard, edge cases

## 🔧 Development Workflow

### Contract Development
1. Edit `kitties.compact`
2. Run `yarn workspace @midnight-ntwrk/kitties-contract compact` to compile
3. Run `yarn workspace @midnight-ntwrk/kitties-contract test` to validate
4. Update API bindings if needed

### Frontend Development
1. Edit files in `apps/web/src/` or `packages/ui/`
2. Run `yarn workspace @repo/web-app dev` for development server
3. Test wallet integration and real-time updates

## 🎨 UI Components Architecture

### Key Components
- **`App.tsx`**: Main application wrapper with theme and providers
- **`KittiesReader.tsx`**: Core application logic and state management
- **`MyKittiesGallery.tsx`**: User's kitty collection display
- **`KittyCard.tsx`**: Individual kitty display with actions
- **`MidnightWallet.tsx`**: Wallet connection and management
- **`WalletWidget.tsx`**: Connection status and controls

### State Management
- **React Context**: `LocalStateProviderContext.tsx`
- **RxJS Observables**: Real-time contract state updates
- **Runtime Configuration**: Environment-specific settings

## 🚨 Common Development Issues & Solutions

### Contract Compilation
- **Issue**: Compact compilation fails
- **Solution**: Check `COMPACT_PATH` environment variable points to `midnight-contracts`

### Browser Build Errors
- **Issue**: Module resolution issues in browser
- **Solution**: Check Vite aliases in `apps/web/vite.config.ts`

### Path Resolution
- **Issue**: Module not found in browser environment
- **Solution**: Ensure using browser-compatible paths in `packages/api/kitties/src/common/`

## 📚 External Dependencies

### Core Midnight Dependencies
- `@midnight-ntwrk/compact-runtime`: Compact language runtime
- `@midnight-ntwrk/midnight-js-*`: Midnight JavaScript SDK components
- `@midnight-ntwrk/wallet*`: Wallet integration libraries

### External Contract Modules
- `midnight-contracts`: External NFT module source (GitHub: `riusricardo/midnight-contracts`)

### Development Tools
- `turbo`: Monorepo build system
- `vitest`: Testing framework
- `vite`: Frontend build tool
- `typescript`: Type system

## 🎓 Educational Aspects

### For Compact Learning
- **Real-world patterns**: Data structures, state management, module integration
- **Best practices**: Error handling, access control, state transitions
- **Advanced features**: Nested maps, breeding algorithms, marketplace logic

### For Midnight Ecosystem
- **Module integration**: How to use external contract modules
- **Browser-only development**: Browser-optimized development patterns
- **Web dApp architecture**: Complete browser-based dApp development approach

## 🔮 Extension Points

### Easy Additions
- New kitty attributes (add fields to `Kitty` struct)
- Additional marketplace features (auctions, batch operations)
- Enhanced breeding (more complex genetics)

### Architecture Extensions
- Multiple contract support (contract factory pattern)
- Advanced state management (more complex ledger structures)
- Enhanced privacy features (selective disclosure patterns)

## 🏷️ Project Metadata

- **License**: GPL-3.0
- **Author**: Ricardo Rius
- **Package Manager**: Yarn v1.22.22
- **Node.js**: v18+
- **TypeScript**: v5.8.3
- **Turbo Version**: v2.5.4

## 📋 Quick Debugging Checklist

When issues arise, check:
1. ✅ Dependencies installed (`yarn install`)
2. ✅ Contracts compiled (`yarn compact`)
3. ✅ Environment variables set (`COMPACT_PATH`)
4. ✅ Network connectivity (for web interface testnet operations)
5. ✅ Wallet connected (for frontend)
6. ✅ Build artifacts present in `dist/` folders

---

## 🚀 New Developer Onboarding

### First Steps for New Developers

1. **Environment Setup**
   ```bash
   # Prerequisites: Node.js v18+, Yarn
   git clone https://github.com/riusricardo/midnight-kitties.git
   cd midnight-kitties
   yarn install
   
   # Set environment variable for Compact compiler
   export COMPACT_PATH=/path/to/midnight-contracts
   ```

2. **Build and Test**
   ```bash
   # Compile contracts and build everything
   yarn build
   
   # Run tests to verify setup
   yarn workspace @midnight-ntwrk/kitties-contract test
   ```

3. **Try the Application**
   ```bash
   # Start web application development server
   yarn workspace @repo/web-app dev  # Visit http://localhost:5173/
   
   # Or build and start production server
   yarn workspace @repo/web-app build
   yarn workspace @repo/web-app start  # Visit http://127.0.0.1:8080/
   ```

### Learning Path for New Developers

1. **Start with the Contract** (`packages/contracts/kitties/src/kitties.compact`)
   - Understand the Compact language syntax
   - Study the data structures (Kitty, Offer)
   - Explore the breeding and marketplace logic

2. **Explore the API** (`packages/api/kitties/`)
   - See how the browser API works
   - Study the browser-specific implementations
   - Understand the testing simulator

3. **Frontend Components** (`packages/ui/components/`)
   - React components for the web interface
   - State management with contexts and observables
   - Wallet integration patterns

### Key Concepts to Understand

- **Compact Language**: Midnight's smart contract language
- **External Modules**: Integration with `midnight-contracts` NFT modules
- **Browser-Only API**: API designed exclusively for browser environments
- **Turborepo**: Monorepo build system with caching
- **ZK Proofs**: Privacy-first blockchain architecture

---

**📝 Note for AI Systems**: This is a browser-only version of the Midnight Kitties project. All CLI and Node.js specific functionality has been removed. For detailed implementation specifics, refer to the comprehensive documentation in each package's README file and the source code comments.
