/**
 * Test Data Generation Script
 *
 * Generates blocking chart test files for various scenarios
 *
 * Usage:
 *   npx tsx tests/generate-test-data.ts [scenario]
 *
 * Examples:
 *   npx tsx tests/generate-test-data.ts               # Generate all scenarios
 *   npx tsx tests/generate-test-data.ts simple-meta   # Generate single scenario
 *   npx tsx tests/generate-test-data.ts --list        # List all scenarios
 */

import * as fs from 'fs';
import * as path from 'path';
import { generateTestFile } from '../core/testing/testDataGenerator';
import { ALL_SCENARIOS, listScenarios, getScenario } from '../core/testing/edgeCases';

// ============================================================================
// CONFIGURATION
// ============================================================================

const OUTPUT_DIR = path.join(__dirname, 'fixtures');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// ============================================================================
// CLI HANDLING
// ============================================================================

const args = process.argv.slice(2);

// Help text
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
🧪 Test Data Generator for QuickClick Media Tools

Usage:
  npx tsx tests/generate-test-data.ts [options] [scenario]

Options:
  --list, -l        List all available scenarios
  --all, -a         Generate all scenarios (default)
  --help, -h        Show this help message

Scenarios:
  simple-meta       Single valid Meta campaign
  all-platforms     One campaign per platform
  date-formats      Various date format variations
  platforms         Platform name variations
  numeric           Numeric format variations
  budget            Budget calculation edge cases
  missing-fields    Missing required fields
  whitespace        Whitespace issues
  summary           Summary row detection
  large             100 campaigns (performance test)
  kitchen-sink      Mix of all edge cases

Examples:
  npx tsx tests/generate-test-data.ts                 # Generate all scenarios
  npx tsx tests/generate-test-data.ts simple-meta     # Generate one scenario
  npx tsx tests/generate-test-data.ts --list          # List all scenarios
`);
  process.exit(0);
}

// List scenarios
if (args.includes('--list') || args.includes('-l')) {
  console.log('\n📋 Available Test Scenarios:\n');
  console.log('━'.repeat(80) + '\n');

  const scenarios = listScenarios();
  scenarios.forEach(({ key, name, description }) => {
    console.log(`🔹 ${key.padEnd(20)} ${name}`);
    console.log(`   ${description}\n`);
  });

  console.log('━'.repeat(80));
  console.log(`\nTotal scenarios: ${scenarios.length}`);
  console.log(`\nGenerate with: npx tsx tests/generate-test-data.ts [scenario-key]\n`);
  process.exit(0);
}

// ============================================================================
// GENERATION
// ============================================================================

async function generateScenario(key: string) {
  const scenario = getScenario(key);
  if (!scenario) {
    console.error(`❌ Error: Scenario '${key}' not found`);
    console.log(`   Run with --list to see available scenarios`);
    return false;
  }

  const filename = `${key}.xlsx`;
  const filepath = path.join(OUTPUT_DIR, filename);

  try {
    await generateTestFile(scenario, filepath);
    return true;
  } catch (error) {
    console.error(`❌ Error generating ${key}:`, error);
    return false;
  }
}

async function generateAll() {
  console.log('\n🧪 Generating All Test Scenarios\n');
  console.log('━'.repeat(80) + '\n');

  const scenarios = Object.keys(ALL_SCENARIOS);
  let successCount = 0;
  let failCount = 0;

  for (const key of scenarios) {
    const success = await generateScenario(key);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
  }

  console.log('\n' + '━'.repeat(80));
  console.log(`\n✅ Successfully generated: ${successCount}/${scenarios.length} scenarios`);
  if (failCount > 0) {
    console.log(`❌ Failed: ${failCount}`);
  }
  console.log(`\n📁 Output directory: ${OUTPUT_DIR}\n`);
}

async function main() {
  // No args or --all flag: generate all scenarios
  if (args.length === 0 || args.includes('--all') || args.includes('-a')) {
    await generateAll();
    return;
  }

  // Specific scenario(s) requested
  console.log('\n🧪 Generating Test Scenarios\n');
  console.log('━'.repeat(80) + '\n');

  let successCount = 0;
  let failCount = 0;

  for (const key of args) {
    if (key.startsWith('--')) continue; // Skip flags
    const success = await generateScenario(key);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
  }

  console.log('\n' + '━'.repeat(80));
  console.log(`\n✅ Successfully generated: ${successCount}/${args.length} scenarios`);
  if (failCount > 0) {
    console.log(`❌ Failed: ${failCount}`);
  }
  console.log(`\n📁 Output directory: ${OUTPUT_DIR}\n`);
}

// Run the script
main().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
