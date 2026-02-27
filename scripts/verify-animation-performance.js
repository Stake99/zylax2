#!/usr/bin/env node

/**
 * Animation Performance Verification Script
 * 
 * This script verifies that animations use GPU-accelerated properties
 * and follow best practices for 60fps performance.
 * 
 * Requirements: 14.1-14.4
 */

const fs = require('fs');
const path = require('path');

// GPU-accelerated properties
const GPU_ACCELERATED = ['transform', 'opacity', 'filter'];

// Properties that cause layout thrashing (should be avoided)
const LAYOUT_THRASHING = ['width', 'height', 'top', 'left', 'right', 'bottom', 'margin', 'padding'];

// Colors for output
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const issues = [];
  const successes = [];

  // Check for Framer Motion usage
  if (content.includes('framer-motion')) {
    successes.push('Uses Framer Motion for animations');
  }

  // Check for GPU-accelerated properties in animate props
  const animateRegex = /animate=\{[^}]*\}/g;
  const animateMatches = content.match(animateRegex) || [];
  
  animateMatches.forEach((match) => {
    GPU_ACCELERATED.forEach((prop) => {
      if (match.includes(prop)) {
        successes.push(`Uses GPU-accelerated property: ${prop}`);
      }
    });

    LAYOUT_THRASHING.forEach((prop) => {
      if (match.includes(`${prop}:`)) {
        issues.push(`⚠️  Animates layout property: ${prop} (may cause performance issues)`);
      }
    });
  });

  // Check for transition duration
  if (content.includes('duration:') || content.includes('transition:')) {
    const durationRegex = /duration:\s*(\d+\.?\d*)/g;
    const durationMatches = [...content.matchAll(durationRegex)];
    
    durationMatches.forEach((match) => {
      const duration = parseFloat(match[1]);
      if (duration >= 0.3) {
        successes.push(`Transition duration >= 300ms: ${duration}s`);
      } else {
        issues.push(`⚠️  Transition duration < 300ms: ${duration}s (may feel too fast)`);
      }
    });
  }

  // Check for will-change usage (should be minimal)
  if (content.includes('will-change')) {
    issues.push('⚠️  Uses will-change (should be used sparingly)');
  }

  // Check for reduced motion support
  if (content.includes('prefers-reduced-motion') || content.includes('useReducedMotion')) {
    successes.push('Implements reduced motion support');
  }

  return { issues, successes };
}

function scanDirectory(dir, results = { files: 0, issues: [], successes: [] }) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      scanDirectory(filePath, results);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      const { issues, successes } = checkFile(filePath);
      
      if (issues.length > 0 || successes.length > 0) {
        results.files++;
        
        console.log(`\n${filePath}:`);
        
        if (successes.length > 0) {
          successes.forEach((success) => {
            console.log(`  ${GREEN}✓${RESET} ${success}`);
          });
        }
        
        if (issues.length > 0) {
          issues.forEach((issue) => {
            console.log(`  ${YELLOW}${issue}${RESET}`);
          });
        }

        results.issues.push(...issues);
        results.successes.push(...successes);
      }
    }
  });

  return results;
}

console.log('🔍 Scanning for animation performance issues...\n');

const results = scanDirectory('./components');

console.log('\n' + '='.repeat(60));
console.log('📊 Animation Performance Summary');
console.log('='.repeat(60));
console.log(`Files scanned: ${results.files}`);
console.log(`${GREEN}✓ Successes: ${results.successes.length}${RESET}`);
console.log(`${YELLOW}⚠️  Warnings: ${results.issues.length}${RESET}`);

if (results.issues.length === 0) {
  console.log(`\n${GREEN}✅ All animations follow performance best practices!${RESET}`);
  console.log('Target: 60fps achievable with GPU-accelerated properties');
} else {
  console.log(`\n${YELLOW}⚠️  Some animations may benefit from optimization${RESET}`);
}

console.log('\n' + '='.repeat(60));
console.log('Performance Guidelines:');
console.log('='.repeat(60));
console.log('✓ Use transform and opacity for animations (GPU-accelerated)');
console.log('✓ Avoid animating width, height, top, left (causes layout thrashing)');
console.log('✓ Use transition duration >= 300ms for smooth animations');
console.log('✓ Implement reduced motion support for accessibility');
console.log('✓ Use will-change sparingly (only when needed)');
console.log('='.repeat(60) + '\n');

process.exit(results.issues.length > 0 ? 1 : 0);
