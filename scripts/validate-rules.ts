#!/usr/bin/env node

/**
 * Automated Rule Validation Script
 * 
 * This script validates the entire Cursor rules system for:
 * - Rule completeness and quality
 * - Conflicts between rules
 * - Business alignment
 * - Usage effectiveness
 */

import { promises as fs } from 'fs';
import path from 'path';
import { execSync } from 'child_process';

interface ValidationResult {
  success: boolean;
  score: number;
  issues: ValidationIssue[];
  recommendations: string[];
  businessImpact: 'low' | 'medium' | 'high' | 'critical';
}

interface ValidationIssue {
  type: 'error' | 'warning' | 'info';
  category: 'completeness' | 'conflict' | 'business' | 'technical';
  file: string;
  description: string;
  fix: string;
  businessImpact: string;
}

class RuleValidator {
  private readonly rulesDir = '.cursor/rules';
  private readonly businessCriticalRules = [
    'companyInformationIntegration.mdc',
    'security-best-practices.mdc',
    'typescript-standards.mdc',
    'react-component-standards.mdc'
  ];

  async validateRules(): Promise<ValidationResult> {
    console.log('🔍 Starting Cursor Rules validation...\n');

    const issues: ValidationIssue[] = [];
    let totalScore = 100;

    try {
      // 1. Check rule completeness
      console.log('📋 Checking rule completeness...');
      const completenessIssues = await this.checkCompleteness();
      issues.push(...completenessIssues);

      // 2. Detect conflicts
      console.log('⚔️  Detecting rule conflicts...');
      const conflictIssues = await this.detectConflicts();
      issues.push(...conflictIssues);

      // 3. Validate business alignment
      console.log('🏢 Validating business alignment...');
      const businessIssues = await this.validateBusinessAlignment();
      issues.push(...businessIssues);

      // 4. Check technical quality
      console.log('🔧 Checking technical quality...');
      const technicalIssues = await this.checkTechnicalQuality();
      issues.push(...technicalIssues);

      // Calculate final score
      totalScore = this.calculateScore(issues);

      // Generate recommendations
      const recommendations = this.generateRecommendations(issues);

      // Determine business impact
      const businessImpact = this.assessOverallBusinessImpact(issues);

      console.log('\n✅ Validation complete!');
      console.log(`📊 Overall Score: ${totalScore}/100`);
      console.log(`🎯 Business Impact: ${businessImpact.toUpperCase()}`);

      return {
        success: totalScore >= 80 && !issues.some(i => i.type === 'error'),
        score: totalScore,
        issues,
        recommendations,
        businessImpact,
      };

    } catch (error) {
      console.error('❌ Validation failed:', error);
      return {
        success: false,
        score: 0,
        issues: [{
          type: 'error',
          category: 'technical',
          file: 'validation-system',
          description: `Validation system error: ${error.message}`,
          fix: 'Check validation script and rule files',
          businessImpact: 'System reliability compromised',
        }],
        recommendations: ['Fix validation system errors'],
        businessImpact: 'critical',
      };
    }
  }

  private async checkCompleteness(): Promise<ValidationIssue[]> {
    const issues: ValidationIssue[] = [];
    const ruleFiles = await this.getRuleFiles();

    for (const file of ruleFiles) {
      const content = await fs.readFile(path.join(this.rulesDir, file), 'utf-8');
      
      // Check for stub files
      if (content.length < 200) {
        const isCritical = this.businessCriticalRules.includes(file);
        issues.push({
          type: isCritical ? 'error' : 'warning',
          category: 'completeness',
          file,
          description: 'Rule file appears to be incomplete or stub',
          fix: 'Develop comprehensive rule content with examples and guidelines',
          businessImpact: isCritical ? 
            'Critical business functionality lacks guidance' : 
            'Development efficiency may be reduced',
        });
      }

      // Check required sections
      const requiredSections = ['Overview', 'Implementation', 'Examples'];
      const missingSections = requiredSections.filter(section => 
        !content.includes(`## ${section}`) && !content.includes(`# ${section}`)
      );

      for (const section of missingSections) {
        issues.push({
          type: 'warning',
          category: 'completeness',
          file,
          description: `Missing required section: ${section}`,
          fix: `Add ${section} section with relevant content`,
          businessImpact: 'Reduced developer clarity and adoption',
        });
      }

      // Check for business context
      if (!content.includes('Business Context') && !content.includes('business')) {
        issues.push({
          type: 'warning',
          category: 'business',
          file,
          description: 'Rule lacks business context explanation',
          fix: 'Add business justification and impact explanation',
          businessImpact: 'Developers may not understand business value',
        });
      }
    }

    return issues;
  }

  private async detectConflicts(): Promise<ValidationIssue[]> {
    const issues: ValidationIssue[] = [];
    const rules = await this.loadAllRuleContents();

    // Check for export pattern conflicts
    const exportConflicts = this.checkExportPatternConflicts(rules);
    issues.push(...exportConflicts);

    // Check for TypeScript pattern conflicts
    const typeConflicts = this.checkTypeScriptConflicts(rules);
    issues.push(...typeConflicts);

    // Check for CSS pattern conflicts
    const cssConflicts = this.checkCSSConflicts(rules);
    issues.push(...cssConflicts);

    return issues;
  }

  private checkExportPatternConflicts(rules: Map<string, string>): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    const exportPatterns = new Map<string, 'named' | 'default' | 'mixed'>();

    for (const [file, content] of rules) {
      if (content.includes('export default') && content.includes('named export')) {
        exportPatterns.set(file, 'mixed');
      } else if (content.includes('export default')) {
        exportPatterns.set(file, 'default');
      } else if (content.includes('export const') || content.includes('named export')) {
        exportPatterns.set(file, 'named');
      }
    }

    // Check for conflicts
    const defaultFiles = Array.from(exportPatterns.entries())
      .filter(([_, pattern]) => pattern === 'default')
      .map(([file]) => file);
    
    const namedFiles = Array.from(exportPatterns.entries())
      .filter(([_, pattern]) => pattern === 'named')
      .map(([file]) => file);

    if (defaultFiles.length > 0 && namedFiles.length > 0) {
      issues.push({
        type: 'error',
        category: 'conflict',
        file: 'multiple files',
        description: `Export pattern conflict: ${defaultFiles.join(', ')} prefer default exports while ${namedFiles.join(', ')} prefer named exports`,
        fix: 'Standardize on named exports across all rules (recommended)',
        businessImpact: 'Inconsistent codebase reduces maintainability and team productivity',
      });
    }

    return issues;
  }

  private checkTypeScriptConflicts(rules: Map<string, string>): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    
    // Check for any usage conflicts
    const anyUsageFiles: string[] = [];
    const strictTypeFiles: string[] = [];

    for (const [file, content] of rules) {
      if (content.includes(': any') && !content.includes('❌') && !content.includes('avoid')) {
        anyUsageFiles.push(file);
      }
      if (content.includes('strict') && content.includes('TypeScript')) {
        strictTypeFiles.push(file);
      }
    }

    if (anyUsageFiles.length > 0 && strictTypeFiles.length > 0) {
      issues.push({
        type: 'warning',
        category: 'conflict',
        file: 'multiple files',
        description: `Potential TypeScript conflict: some rules allow 'any' usage while others enforce strict typing`,
        fix: 'Clarify when any usage is acceptable vs. strict typing requirements',
        businessImpact: 'Type safety inconsistency may lead to runtime errors',
      });
    }

    return issues;
  }

  private checkCSSConflicts(rules: Map<string, string>): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    
    // Check for CSS methodology conflicts
    const methodologies = new Map<string, string[]>();
    
    for (const [file, content] of rules) {
      if (content.includes('CSS Modules')) {
        methodologies.set('modules', [...(methodologies.get('modules') || []), file]);
      }
      if (content.includes('styled-components') || content.includes('emotion')) {
        methodologies.set('css-in-js', [...(methodologies.get('css-in-js') || []), file]);
      }
      if (content.includes('Tailwind') || content.includes('utility-first')) {
        methodologies.set('utility', [...(methodologies.get('utility') || []), file]);
      }
    }

    const activeMethods = Array.from(methodologies.keys()).filter(key => 
      methodologies.get(key)!.length > 0
    );

    if (activeMethods.length > 1) {
      issues.push({
        type: 'warning',
        category: 'conflict',
        file: 'multiple files',
        description: `Multiple CSS methodologies recommended: ${activeMethods.join(', ')}`,
        fix: 'Standardize on single CSS methodology (CSS Modules recommended for this project)',
        businessImpact: 'Mixed CSS approaches increase complexity and reduce maintainability',
      });
    }

    return issues;
  }

  private async validateBusinessAlignment(): Promise<ValidationIssue[]> {
    const issues: ValidationIssue[] = [];
    const rules = await this.loadAllRuleContents();

    for (const [file, content] of rules) {
      // Check for business context
      const hasBusinessContext = content.includes('business') || 
                                content.includes('Business') ||
                                content.includes('customer') ||
                                content.includes('Customer');

      if (!hasBusinessContext && !file.includes('git-') && !file.includes('rule-')) {
        issues.push({
          type: 'warning',
          category: 'business',
          file,
          description: 'Rule lacks clear business context or justification',
          fix: 'Add section explaining business value and customer impact',
          businessImpact: 'Developers may not understand or prioritize rule adoption',
        });
      }

      // Check for measurable outcomes
      const hasMeasurableOutcomes = content.includes('metric') ||
                                   content.includes('measure') ||
                                   content.includes('KPI') ||
                                   content.includes('track');

      if (!hasMeasurableOutcomes && this.businessCriticalRules.includes(file)) {
        issues.push({
          type: 'info',
          category: 'business',
          file,
          description: 'Business-critical rule lacks measurable success criteria',
          fix: 'Add success metrics and tracking mechanisms',
          businessImpact: 'Difficult to measure rule effectiveness and business impact',
        });
      }
    }

    return issues;
  }

  private async checkTechnicalQuality(): Promise<ValidationIssue[]> {
    const issues: ValidationIssue[] = [];
    const rules = await this.loadAllRuleContents();

    for (const [file, content] of rules) {
      // Check for code examples
      if (!content.includes('```') && !file.includes('README')) {
        issues.push({
          type: 'warning',
          category: 'technical',
          file,
          description: 'Rule lacks code examples',
          fix: 'Add practical code examples demonstrating the rule',
          businessImpact: 'Reduced developer adoption due to unclear implementation',
        });
      }

      // Check for TypeScript usage in examples
      if (content.includes('```javascript') && !content.includes('```typescript')) {
        issues.push({
          type: 'info',
          category: 'technical',
          file,
          description: 'Rule uses JavaScript examples instead of TypeScript',
          fix: 'Convert examples to TypeScript for consistency',
          businessImpact: 'Inconsistent with project TypeScript-first approach',
        });
      }

      // Check for outdated patterns
      const outdatedPatterns = ['React.FC', 'defaultProps', 'React.Component'];
      for (const pattern of outdatedPatterns) {
        if (content.includes(pattern) && !content.includes('❌') && !content.includes('deprecated')) {
          issues.push({
            type: 'warning',
            category: 'technical',
            file,
            description: `Rule contains potentially outdated pattern: ${pattern}`,
            fix: `Update to modern React patterns or mark as deprecated`,
            businessImpact: 'Developers may follow outdated practices',
          });
        }
      }
    }

    return issues;
  }

  private calculateScore(issues: ValidationIssue[]): number {
    let score = 100;

    for (const issue of issues) {
      switch (issue.type) {
        case 'error':
          score -= 20;
          break;
        case 'warning':
          score -= 10;
          break;
        case 'info':
          score -= 5;
          break;
      }
    }

    return Math.max(0, score);
  }

  private generateRecommendations(issues: ValidationIssue[]): string[] {
    const recommendations: string[] = [];
    const errorCount = issues.filter(i => i.type === 'error').length;
    const warningCount = issues.filter(i => i.type === 'warning').length;

    if (errorCount > 0) {
      recommendations.push(`🚨 Address ${errorCount} critical error(s) immediately`);
    }

    if (warningCount > 3) {
      recommendations.push(`⚠️  Consider addressing ${warningCount} warning(s) to improve system quality`);
    }

    // Specific recommendations based on issue patterns
    const conflictIssues = issues.filter(i => i.category === 'conflict');
    if (conflictIssues.length > 0) {
      recommendations.push('🔧 Resolve rule conflicts to prevent developer confusion');
    }

    const businessIssues = issues.filter(i => i.category === 'business');
    if (businessIssues.length > 2) {
      recommendations.push('💼 Enhance business context to improve rule adoption');
    }

    const completenessIssues = issues.filter(i => i.category === 'completeness');
    if (completenessIssues.length > 1) {
      recommendations.push('📝 Complete incomplete rule files to provide full guidance');
    }

    return recommendations;
  }

  private assessOverallBusinessImpact(issues: ValidationIssue[]): 'low' | 'medium' | 'high' | 'critical' {
    const criticalIssues = issues.filter(i => 
      i.type === 'error' && this.businessCriticalRules.some(rule => i.file.includes(rule))
    );

    if (criticalIssues.length > 0) return 'critical';

    const highImpactIssues = issues.filter(i => 
      i.businessImpact.includes('Critical') || 
      i.businessImpact.includes('customer') ||
      i.type === 'error'
    );

    if (highImpactIssues.length > 2) return 'high';
    if (issues.filter(i => i.type === 'warning').length > 5) return 'medium';
    
    return 'low';
  }

  private async getRuleFiles(): Promise<string[]> {
    const files = await fs.readdir(this.rulesDir);
    return files.filter(file => file.endsWith('.mdc'));
  }

  private async loadAllRuleContents(): Promise<Map<string, string>> {
    const rules = new Map<string, string>();
    const files = await this.getRuleFiles();

    for (const file of files) {
      const content = await fs.readFile(path.join(this.rulesDir, file), 'utf-8');
      rules.set(file, content);
    }

    return rules;
  }
}

// CLI Interface
async function main() {
  const validator = new RuleValidator();
  const result = await validator.validateRules();

  // Output results
  console.log('\n' + '='.repeat(60));
  console.log('📊 VALIDATION RESULTS');
  console.log('='.repeat(60));

  console.log(`\n🎯 Overall Score: ${result.score}/100`);
  console.log(`✅ Success: ${result.success ? 'PASS' : 'FAIL'}`);
  console.log(`🏢 Business Impact: ${result.businessImpact.toUpperCase()}`);

  if (result.issues.length > 0) {
    console.log('\n🔍 ISSUES FOUND:');
    
    const errorIssues = result.issues.filter(i => i.type === 'error');
    const warningIssues = result.issues.filter(i => i.type === 'warning');
    const infoIssues = result.issues.filter(i => i.type === 'info');

    if (errorIssues.length > 0) {
      console.log('\n❌ ERRORS:');
      errorIssues.forEach(issue => {
        console.log(`  • ${issue.file}: ${issue.description}`);
        console.log(`    Fix: ${issue.fix}`);
        console.log(`    Impact: ${issue.businessImpact}\n`);
      });
    }

    if (warningIssues.length > 0) {
      console.log('\n⚠️  WARNINGS:');
      warningIssues.forEach(issue => {
        console.log(`  • ${issue.file}: ${issue.description}`);
        console.log(`    Fix: ${issue.fix}\n`);
      });
    }

    if (infoIssues.length > 0 && process.env.VERBOSE) {
      console.log('\n💡 SUGGESTIONS:');
      infoIssues.forEach(issue => {
        console.log(`  • ${issue.file}: ${issue.description}`);
        console.log(`    Fix: ${issue.fix}\n`);
      });
    }
  }

  if (result.recommendations.length > 0) {
    console.log('\n🎯 RECOMMENDATIONS:');
    result.recommendations.forEach(rec => console.log(`  ${rec}`));
  }

  console.log('\n' + '='.repeat(60));

  // Exit with appropriate code
  process.exit(result.success ? 0 : 1);
}

if (require.main === module) {
  main().catch(error => {
    console.error('❌ Validation script failed:', error);
    process.exit(1);
  });
} 