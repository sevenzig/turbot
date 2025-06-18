#!/usr/bin/env node

/**
 * Quick Rule Check - Fast validation for daily development
 * 
 * Focuses on the essential checks developers need:
 * - Core rules are complete
 * - No obvious conflicts
 * - Business data integration working
 * - Basic quality standards met
 */

import { promises as fs } from 'fs';
import path from 'path';

interface QuickCheckResult {
  success: boolean;
  score: number;
  issues: string[];
  warnings: string[];
  recommendations: string[];
}

class QuickRuleChecker {
  private readonly rulesDir = '.cursor/rules';
  private readonly coreRules = [
    'typescript-standards.mdc',
    'react-component-standards.mdc', 
    'css-design-system.mdc',
    'companyInformationIntegration.mdc'
  ];

  async runQuickCheck(): Promise<QuickCheckResult> {
    console.log('⚡ Running quick rule validation...\n');

    const issues: string[] = [];
    const warnings: string[] = [];
    const recommendations: string[] = [];
    let score = 100;

    try {
      // 1. Check core rules exist and aren't stubs
      console.log('📋 Checking core rules...');
      const coreIssues = await this.checkCoreRules();
      issues.push(...coreIssues.errors);
      warnings.push(...coreIssues.warnings);
      score -= coreIssues.errors.length * 15;
      score -= coreIssues.warnings.length * 5;

      // 2. Check business data integration
      console.log('🏢 Checking business data patterns...');
      const businessIssues = await this.checkBusinessDataIntegration();
      issues.push(...businessIssues.errors);
      warnings.push(...businessIssues.warnings);
      score -= businessIssues.errors.length * 10;

      // 3. Check for obvious conflicts
      console.log('⚔️  Checking for conflicts...');
      const conflictIssues = await this.checkBasicConflicts();
      issues.push(...conflictIssues.errors);
      warnings.push(...conflictIssues.warnings);
      score -= conflictIssues.errors.length * 20;

      // 4. Generate recommendations
      recommendations.push(...this.generateQuickRecommendations(issues, warnings));

      const success = issues.length === 0 && score >= 80;
      
      console.log(`\n${success ? '✅' : '❌'} Quick check complete!`);
      console.log(`📊 Score: ${Math.max(0, score)}/100`);
      
      if (issues.length > 0) {
        console.log(`🚨 Issues: ${issues.length}`);
      }
      if (warnings.length > 0) {
        console.log(`⚠️  Warnings: ${warnings.length}`);
      }

      return {
        success,
        score: Math.max(0, score),
        issues,
        warnings,
        recommendations
      };

    } catch (error) {
      console.error('❌ Quick check failed:', error.message);
      return {
        success: false,
        score: 0,
        issues: [`Validation system error: ${error.message}`],
        warnings: [],
        recommendations: ['Fix validation system and try again']
      };
    }
  }

  private async checkCoreRules(): Promise<{errors: string[], warnings: string[]}> {
    const errors: string[] = [];
    const warnings: string[] = [];

    for (const ruleFile of this.coreRules) {
      const filePath = path.join(this.rulesDir, ruleFile);
      
      try {
        const content = await fs.readFile(filePath, 'utf-8');
        
        // Check if it's a stub file
        if (content.length < 500) {
          errors.push(`${ruleFile} appears to be incomplete (${content.length} bytes)`);
          continue;
        }

        // Check for essential sections
        if (!content.includes('## ') && !content.includes('# ')) {
          warnings.push(`${ruleFile} lacks proper section structure`);
        }

        // Check for examples
        if (!content.includes('```') && !content.includes('typescript') && !content.includes('css')) {
          warnings.push(`${ruleFile} lacks code examples`);
        }

        // Check for business context
        if (!content.toLowerCase().includes('business') && ruleFile !== 'typescript-standards.mdc') {
          warnings.push(`${ruleFile} lacks business context`);
        }

      } catch (error) {
        errors.push(`${ruleFile} not found or unreadable`);
      }
    }

    return { errors, warnings };
  }

  private async checkBusinessDataIntegration(): Promise<{errors: string[], warnings: string[]}> {
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      // Check if businessInfo integration rule exists and is complete
      const businessRulePath = path.join(this.rulesDir, 'companyInformationIntegration.mdc');
      const content = await fs.readFile(businessRulePath, 'utf-8');

      if (!content.includes('businessInfo.ts')) {
        errors.push('Business data integration rule missing businessInfo.ts references');
      }

      if (!content.includes('single source of truth')) {
        warnings.push('Business rule should emphasize single source of truth pattern');
      }

      // Check component templates if they exist
      const templatesPath = path.join(this.rulesDir, 'component-templates.mdc');
      try {
        const templatesContent = await fs.readFile(templatesPath, 'utf-8');
        if (!templatesContent.includes('businessInfo')) {
          warnings.push('Component templates should demonstrate business data integration');
        }
      } catch {
        // Templates file doesn't exist - that's okay
      }

    } catch (error) {
      errors.push('Cannot validate business data integration - rule file missing');
    }

    return { errors, warnings };
  }

  private async checkBasicConflicts(): Promise<{errors: string[], warnings: string[]}> {
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      const ruleFiles = await this.getRuleFiles();
      const ruleContents = new Map<string, string>();

      // Load all rule contents
      for (const file of ruleFiles) {
        try {
          const content = await fs.readFile(path.join(this.rulesDir, file), 'utf-8');
          ruleContents.set(file, content);
        } catch {
          // Skip unreadable files
        }
      }

      // Check for export pattern conflicts
      const exportPatterns = new Set<string>();
      for (const [file, content] of ruleContents) {
        if (content.includes('export default') && content.includes('named export')) {
          errors.push(`${file} contains conflicting export patterns`);
        }
        if (content.includes('export default')) {
          exportPatterns.add('default');
        }
        if (content.includes('named export')) {
          exportPatterns.add('named');
        }
      }

      if (exportPatterns.has('default') && exportPatterns.has('named')) {
        warnings.push('Mixed export patterns detected across rules - consider standardizing');
      }

      // Check for TypeScript strictness conflicts
      let strictModeCount = 0;
      let anyUsageCount = 0;
      for (const [file, content] of ruleContents) {
        if (content.includes('strict mode') || content.includes('strict: true')) {
          strictModeCount++;
        }
        if (content.includes('any') && content.includes('typescript')) {
          anyUsageCount++;
        }
      }

      if (strictModeCount > 0 && anyUsageCount > 0) {
        warnings.push('Potential conflict: strict TypeScript rules vs any usage patterns');
      }

    } catch (error) {
      errors.push(`Conflict detection failed: ${error.message}`);
    }

    return { errors, warnings };
  }

  private generateQuickRecommendations(issues: string[], warnings: string[]): string[] {
    const recommendations: string[] = [];

    if (issues.length > 0) {
      recommendations.push('🚨 Fix critical issues first - these block development');
    }

    if (warnings.some(w => w.includes('incomplete') || w.includes('stub'))) {
      recommendations.push('📝 Complete core rule files for better developer guidance');
    }

    if (warnings.some(w => w.includes('business'))) {
      recommendations.push('🏢 Add business context to rules for better adoption');
    }

    if (warnings.some(w => w.includes('examples') || w.includes('code'))) {
      recommendations.push('💻 Add code examples to rules for practical guidance');
    }

    if (issues.length === 0 && warnings.length === 0) {
      recommendations.push('🎉 Rules look good! Consider running full validation for detailed analysis');
    }

    return recommendations;
  }

  private async getRuleFiles(): Promise<string[]> {
    const files = await fs.readdir(this.rulesDir);
    return files.filter(file => file.endsWith('.mdc'));
  }

  async printResults(result: QuickCheckResult): Promise<void> {
    console.log('\n' + '='.repeat(50));
    console.log('📊 QUICK RULE CHECK RESULTS');
    console.log('='.repeat(50));

    console.log(`\n🎯 Overall Score: ${result.score}/100`);
    console.log(`✅ Status: ${result.success ? 'PASSING' : 'NEEDS ATTENTION'}`);

    if (result.issues.length > 0) {
      console.log('\n🚨 CRITICAL ISSUES:');
      result.issues.forEach((issue, i) => {
        console.log(`  ${i + 1}. ${issue}`);
      });
    }

    if (result.warnings.length > 0) {
      console.log('\n⚠️  WARNINGS:');
      result.warnings.forEach((warning, i) => {
        console.log(`  ${i + 1}. ${warning}`);
      });
    }

    if (result.recommendations.length > 0) {
      console.log('\n💡 RECOMMENDATIONS:');
      result.recommendations.forEach((rec, i) => {
        console.log(`  ${i + 1}. ${rec}`);
      });
    }

    console.log('\n' + '='.repeat(50));
    console.log('Run `npm run validate-rules` for detailed analysis');
    console.log('='.repeat(50));
  }
}

async function main() {
  const checker = new QuickRuleChecker();
  const result = await checker.runQuickCheck();
  await checker.printResults(result);
  
  // Exit with error code if validation failed
  process.exit(result.success ? 0 : 1);
}

if (require.main === module) {
  main().catch(console.error);
}

export { QuickRuleChecker }; 